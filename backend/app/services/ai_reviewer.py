import json
import os

from groq import Groq


# ============================================================
# GROQ CLIENT
# ============================================================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = "openai/gpt-oss-120b"


# ============================================================
# CODE ANALYZER
# ============================================================

def analyze_code(language: str, code: str):

    prompt = f"""
You are a Senior Software Engineer, Security Engineer, and Code Reviewer.

Review ONLY the given {language} code.

Your job is to:
1. Identify real bugs and security vulnerabilities.
2. Identify bad coding practices.
3. Identify performance problems where relevant.
4. Give a realistic code quality score.
5. Provide specific suggestions.
6. Rewrite the code to fix the detected issues.

IMPORTANT:
The improved code MUST actually be different from the original code when there are issues.

Return ONLY valid JSON.

JSON format:

{{
    "summary": "",
    "score": 0,
    "issues": [
        {{
            "title": "",
            "category": "",
            "severity": "Low",
            "line": 1,
            "description": ""
        }}
    ],
    "suggestions": [
        ""
    ],
    "improved_code": ""
}}

Rules:

1. Return ONLY JSON.
2. Do NOT use markdown.
3. Do NOT use triple backticks.
4. Do NOT explain anything outside JSON.
5. Analyze ONLY the provided code.
6. Never invent vulnerabilities.
7. If there are no issues, return an empty issues array.
8. Suggestions must relate only to detected issues.
9. Score must be between 0 and 100.
10. improved_code must contain ONLY the improved source code.
11. improved_code must NOT contain JSON.
12. improved_code must NOT contain markdown.
13. improved_code must preserve the original functionality.
14. If the original code has a security issue, FIX IT in improved_code.
15. If the original code has poor practices, IMPROVE them in improved_code.
16. Do NOT simply copy the original code into improved_code when issues exist.
17. Use \\n for line breaks.
18. Summary must be under 80 words.

SCORING GUIDELINES:

90-100 = Excellent code with little or nothing to improve.
80-89 = Good code with minor improvements needed.
70-79 = Some issues but generally acceptable.
60-69 = Several issues requiring attention.
40-59 = Significant bugs/security/code-quality problems.
0-39 = Very poor, unsafe, or severely broken code.

Example of a security problem:

Original:

query = "SELECT * FROM users WHERE id = '" + user_id + "'"

Improved:

query = "SELECT * FROM users WHERE id = %s"
db.execute(query, (user_id,))

Code:

{code}
"""

    # ========================================================
    # GROQ REQUEST
    # ========================================================

    try:

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            response_format={
                "type": "json_object"
            }
        )

        text = response.choices[0].message.content

        print("\n========== AI RESPONSE ==========\n")
        print(text)
        print("\n================================\n")

    except Exception as e:

        print("\n========== GROQ ERROR ==========\n")
        print(e)
        print("\n================================\n")

        return {
            "summary": "The AI service could not process the request.",
            "score": 50,
            "issues": [
                {
                    "title": "AI Service Error",
                    "category": "System",
                    "severity": "Low",
                    "line": 1,
                    "description": "The AI service was unavailable or returned an error."
                }
            ],
            "suggestions": [
                "Try analyzing the code again."
            ],
            "improved_code": code
        }

    # ========================================================
    # PARSE JSON
    # ========================================================

    try:

        data = json.loads(text)

    except Exception as e:

        print("\n========== JSON PARSING ERROR ==========\n")
        print(e)
        print("\n========================================\n")

        return {
            "summary": "The AI response could not be parsed.",
            "score": 50,
            "issues": [
                {
                    "title": "Parsing Error",
                    "category": "System",
                    "severity": "Low",
                    "line": 1,
                    "description": "Failed to parse AI response."
                }
            ],
            "suggestions": [
                "Try analyzing the code again."
            ],
            "improved_code": code
        }

    # ========================================================
    # DEFAULTS
    # ========================================================

    data.setdefault(
        "summary",
        "No summary available."
    )

    data.setdefault(
        "score",
        100
    )

    data.setdefault(
        "issues",
        []
    )

    data.setdefault(
        "suggestions",
        []
    )

    data.setdefault(
        "improved_code",
        code
    )

    # ========================================================
    # NORMALIZE SCORE
    # ========================================================

    try:

        score = int(data["score"])

    except (ValueError, TypeError):

        score = 100

    score = max(
        0,
        min(100, score)
    )

    data["score"] = score

    # ========================================================
    # FIX IMPROVED CODE
    # ========================================================

    improved = data.get(
        "improved_code",
        code
    )

    if not isinstance(improved, str):

        improved = code

    improved = improved.replace(
        "\\n",
        "\n"
    )

    improved = improved.replace(
        '\\"',
        '"'
    )

    improved = improved.replace(
        "```python",
        ""
    )

    improved = improved.replace(
        "```",
        ""
    )

    improved = improved.strip()

    # --------------------------------------------------------
    # Prevent JSON being returned as improved code
    # --------------------------------------------------------

    if (
        improved.startswith("{")
        and improved.endswith("}")
    ):

        improved = code

    # --------------------------------------------------------
    # Empty response
    # --------------------------------------------------------

    if not improved:

        improved = code

    # --------------------------------------------------------
    # Very short response
    # --------------------------------------------------------

    if len(improved.split()) < 2:

        improved = code

    data["improved_code"] = improved

    # ========================================================
    # NORMALIZE ISSUES
    # ========================================================

    fixed_issues = []

    issues = data.get(
        "issues",
        []
    )

    if not isinstance(issues, list):

        issues = []

    for issue in issues:

        if isinstance(issue, dict):

            fixed_issues.append(
                {
                    "title": issue.get(
                        "title",
                        "Issue"
                    ),

                    "category": issue.get(
                        "category",
                        "Best Practice"
                    ),

                    "severity": issue.get(
                        "severity",
                        "Low"
                    ),

                    "line": issue.get(
                        "line",
                        1
                    ),

                    "description": issue.get(
                        "description",
                        "No description provided."
                    )
                }
            )

        else:

            fixed_issues.append(
                {
                    "title": str(issue),
                    "category": "Best Practice",
                    "severity": "Low",
                    "line": 1,
                    "description": "Review this part of the code."
                }
            )

    data["issues"] = fixed_issues

    # ========================================================
    # NORMALIZE SUGGESTIONS
    # ========================================================

    fixed_suggestions = []

    suggestions = data.get(
        "suggestions",
        []
    )

    if not isinstance(suggestions, list):

        suggestions = []

    for suggestion in suggestions:

        if isinstance(suggestion, dict):

            fixed_suggestions.append(
                suggestion.get("text")
                or suggestion.get("title")
                or suggestion.get("description")
                or "AI Suggestion"
            )

        else:

            fixed_suggestions.append(
                str(suggestion)
            )

    data["suggestions"] = fixed_suggestions

    # ========================================================
    # FINAL RESULT
    # ========================================================

    return data