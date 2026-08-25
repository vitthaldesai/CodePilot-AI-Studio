from pydantic import BaseModel


class ReviewCreate(BaseModel):

    code: str
    language: str