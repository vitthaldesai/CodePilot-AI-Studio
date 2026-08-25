from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from pydantic import BaseModel
from bson import ObjectId
from bson.errors import InvalidId

from app.database.mongodb import get_database
from app.models.review import ReviewCreate
from app.services.ai_reviewer import analyze_code
from app.services.chat_ai import chat_with_code
from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/review",
    tags=["Code Review"]
)


db = get_database()


# ============================================================
# CREATE REVIEW
# ============================================================

@router.post("/")
def review_code(
    data: ReviewCreate,
    current_user=Depends(get_current_user)
):

    result = analyze_code(
        data.language,
        data.code
    )

    review_document = {

        "user_email": current_user["email"],

        "language": data.language,
        "code": data.code,

        "summary": result.get(
            "summary",
            ""
        ),

        "score": result.get(
            "score",
            100
        ),

        "issues": result.get(
            "issues",
            []
        ),

        "suggestions": result.get(
            "suggestions",
            []
        ),

        "improved_code": result.get(
            "improved_code",
            data.code
        ),

        "created_at": datetime.utcnow()
    }


    print("\n========== SAVING REVIEW ==========")
    print(
        "User:",
        current_user["email"]
    )
    print(
        "Language:",
        data.language
    )
    print("===================================\n")


    db.reviews.insert_one(
        review_document
    )


    return result


# ============================================================
# AI CHAT
# ============================================================


class ChatRequest(BaseModel):
    language: str
    original_code: str
    improved_code: str
    question: str


@router.post("/chat")
def chat(
    request: ChatRequest,
    current_user=Depends(get_current_user)
):

    print("\n========== CHAT REQUEST ==========")
    print("Language:", request.language)
    print("Original code length:", len(request.original_code))
    print("Improved code length:", len(request.improved_code))
    print("Question:", request.question)
    print("==================================\n")

    try:

        answer = chat_with_code(
            language=request.language,
            original_code=request.original_code,
            improved_code=request.improved_code,
            question=request.question
        )

        print("\n========== CHAT RESPONSE ==========")
        print(answer)
        print("===================================\n")

        return {
            "answer": answer
        }

    except Exception as e:

        print("\n========== CHAT ROUTE ERROR ==========")
        print(e)
        print("======================================\n")

        raise HTTPException(
            status_code=500,
            detail="AI chat service failed."
        )

# ============================================================
# HISTORY
# ============================================================

@router.get("/history")
def get_history(
    current_user=Depends(get_current_user)
):

    reviews = list(
        db.reviews.find(
            {
                "user_email": current_user["email"]
            },
            {
                "code": 0,
                "improved_code": 0
            }
        ).sort(
            "created_at",
            -1
        )
    )


    for review in reviews:
        review["_id"] = str(
            review["_id"]
        )


    return reviews


# ============================================================
# STATS
# ============================================================

@router.get("/stats")
def get_stats(
    current_user=Depends(get_current_user)
):

    user_filter = {
        "user_email": current_user["email"]
    }


    total_reviews = db.reviews.count_documents(
        user_filter
    )


    scores = list(
        db.reviews.find(
            user_filter,
            {
                "score": 1,
                "_id": 0
            }
        )
    )


    if scores:

        average_score = (
            sum(
                item.get("score", 0)
                for item in scores
            )
            / len(scores)
        )

    else:

        average_score = 0


    all_reviews = list(
        db.reviews.find(
            user_filter,
            {
                "issues": 1,
                "language": 1,
                "_id": 0
            }
        )
    )


    total_issues = sum(
        len(
            review.get(
                "issues",
                []
            )
        )
        for review in all_reviews
    )


    language_set = set()

    for review in all_reviews:

        language = review.get(
            "language"
        )

        if language:
            language_set.add(
                language
            )


    languages = len(
        language_set
    )


    return {

        "total_reviews":
            total_reviews,

        "average_score":
            round(average_score),

        "security_issues":
            total_issues,

        "languages":
            languages

    }


# ============================================================
# RECENT REVIEWS
# ============================================================

@router.get("/recent")
def get_recent_reviews(
    current_user=Depends(get_current_user)
):

    reviews = list(
        db.reviews.find(
            {
                "user_email":
                    current_user["email"]
            },
            {
                "code": 0,
                "improved_code": 0
            }
        )
        .sort(
            "created_at",
            -1
        )
        .limit(3)
    )


    for review in reviews:

        review["_id"] = str(
            review["_id"]
        )


    return reviews


# ============================================================
# SINGLE REVIEW
# ============================================================

@router.get("/{id}")
def get_review(
    id: str,
    current_user=Depends(get_current_user)
):

    try:

        object_id = ObjectId(id)

    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid review ID"
        )


    review = db.reviews.find_one(
        {
            "_id": object_id,
            "user_email":
                current_user["email"]
        }
    )


    if not review:

        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )


    review["_id"] = str(
        review["_id"]
    )


    return review