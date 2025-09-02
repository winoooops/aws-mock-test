"""
Question data model for AWS Mock Test Platform
"""
from dataclasses import dataclass
from typing import Dict, List, Optional
import uuid


@dataclass
class QuestionOption:
    """Represents a single answer option"""
    letter: str
    text: str


@dataclass
class Question:
    """Question data model compatible with DynamoDB"""
    id: str
    question_number: str
    question_text: str
    options: List[QuestionOption]
    correct_count: int
    source_page: int
    correct_answer: Optional[str] = None
    exam_type: str = "AWS-SAA-C03"
    
    @classmethod
    def create_new(cls, question_number: str, question_text: str, 
                   options: List[QuestionOption], source_page: int) -> 'Question':
        """Factory method to create a new question with auto-generated ID"""
        return cls(
            id=str(uuid.uuid4()),
            question_number=question_number,
            question_text=question_text,
            options=options,
            correct_count=1,  # Default to single correct answer
            source_page=source_page
        )
    
    def to_dict(self) -> Dict:
        """Convert to regular dictionary format"""
        return {
            "id": self.id,
            "question_number": self.question_number,
            "question_text": self.question_text,
            "options": [{"letter": opt.letter, "text": opt.text} for opt in self.options],
            "correct_count": self.correct_count,
            "correct_answer": self.correct_answer,
            "source_page": self.source_page,
            "exam_type": self.exam_type
        }
    
    def to_dynamodb_item(self) -> Dict:
        """Convert to DynamoDB item format"""
        item = {
            "PK": {"S": f"QUESTION#{self.id}"},
            "SK": {"S": f"Q#{self.question_number}"},
            "GSI1PK": {"S": f"EXAM#{self.exam_type}"},
            "GSI1SK": {"S": f"Q#{self.question_number}"},
            "id": {"S": self.id},
            "question_number": {"S": self.question_number},
            "question_text": {"S": self.question_text},
            "correct_count": {"N": str(self.correct_count)},
            "source_page": {"N": str(self.source_page)},
            "exam_type": {"S": self.exam_type}
        }
        
        if self.options:
            item["options"] = {
                "L": [
                    {
                        "M": {
                            "letter": {"S": opt.letter},
                            "text": {"S": opt.text}
                        }
                    } for opt in self.options
                ]
            }
        
        if self.correct_answer:
            item["correct_answer"] = {"S": self.correct_answer}
            
        return item
