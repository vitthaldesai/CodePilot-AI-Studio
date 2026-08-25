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
# AI CHAT
# ============================================================

def chat_with_code(
    language: str,
    original_code: str,
    improved_code: str,
    question: str
):

    prompt = f"""
You are an expert Senior Software Engineer.

The user has already reviewed their code.

Programming Language:
{language}

Original Code:

{original_code}

Improved Code:

{improved_code}

User Question:
{question}

Instructions:

- Answer only the user's question.
- Use the Original Code and Improved Code as context.
- Do not say that code was not provided if either code section contains code.
- Be accurate.
- Explain clearly.
- Use examples if helpful.
- If code is needed, provide code.
- Keep answers concise.
"""

    try:

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

        answer = response.choices[0].message.content

        print("\n========== GROQ CHAT RESPONSE ==========\n")
        print(answer)
        print("\n========================================\n")

        return answer

    except Exception as e:

        print("\n========== GROQ CHAT ERROR ==========\n")
        print(repr(e))
        print("\n=====================================\n")

        return (
            "The AI service is currently unavailable. "
            "Please try again in a moment."
        )