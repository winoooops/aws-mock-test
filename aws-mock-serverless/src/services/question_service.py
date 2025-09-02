"""
Question service for managing question data operations
"""
from typing import List, Optional, Dict
import json
from pathlib import Path

from ..models.question import Question


class QuestionService:
    """Service for managing question operations"""
    
    def __init__(self):
        pass
    
    def save_questions_to_json(self, questions: List[Question], output_path: str) -> None:
        """Save questions to regular JSON format"""
        questions_dict = [q.to_dict() for q in questions]
        
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(questions_dict, f, indent=2, ensure_ascii=False)
    
    def save_questions_to_dynamodb_format(self, questions: List[Question], output_path: str) -> None:
        """Save questions in DynamoDB-compatible format"""
        dynamodb_items = [q.to_dynamodb_item() for q in questions]
        
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(dynamodb_items, f, indent=2, ensure_ascii=False)
    
    def load_questions_from_json(self, json_path: str) -> List[Question]:
        """Load questions from JSON file"""
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        questions = []
        for item in data:
            # Convert dict back to Question object
            options = [QuestionOption(letter=opt["letter"], text=opt["text"]) 
                      for opt in item.get("options", [])]
            
            question = Question(
                id=item["id"],
                question_number=item["question_number"],
                question_text=item["question_text"],
                options=options,
                correct_count=item["correct_count"],
                source_page=item["source_page"],
                correct_answer=item.get("correct_answer"),
                exam_type=item.get("exam_type", "AWS-SAA-C03")
            )
            questions.append(question)
        
        return questions
    
    def get_questions_by_exam_type(self, questions: List[Question], exam_type: str) -> List[Question]:
        """Filter questions by exam type"""
        return [q for q in questions if q.exam_type == exam_type]
    
    def get_question_by_id(self, questions: List[Question], question_id: str) -> Optional[Question]:
        """Find question by ID"""
        return next((q for q in questions if q.id == question_id), None)
    
    def validate_question(self, question: Question) -> Dict[str, List[str]]:
        """Validate question data and return any errors"""
        errors = []
        
        if not question.question_text.strip():
            errors.append("Question text cannot be empty")
        
        if question.correct_count < 0:
            errors.append("Correct count cannot be negative")
        
        if question.options and question.correct_count > len(question.options):
            errors.append("Correct count cannot exceed number of options")
        
        if not question.question_number:
            errors.append("Question number is required")
        
        return {"errors": errors, "is_valid": len(errors) == 0}
