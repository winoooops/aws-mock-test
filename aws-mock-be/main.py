from pathlib import Path
from pypdf import PdfReader
import re
import json
import uuid
from typing import Dict, List, Optional

def extract_pages_pdf(path: str | Path):
    path = Path(path)
    reader = PdfReader(path)

    # make sure the pdf files is not encrypted
    if getattr(reader, "is_encrypted", False):
        try:
            reader.decrypt("")
        except Exception as e:
            raise RuntimeError(f"Can't optn encrypted pdf: {path}") from e

    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        yield i, text

class QuestionData:
    def __init__(self):
        self.id: str = str(uuid.uuid4())
        self.question_number: Optional[str] = None
        self.question_text: str = ""
        self.options: List[Dict[str, str]] = []
        self.is_multiple_choice: bool = False
        self.how_many_options_should_be_chosen: int = 1
        self.correct_answer: Optional[str] = None
        self.source_page: Optional[int] = None

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "question_number": self.question_number,
            "question_text": self.question_text,
            "options": self.options,
            "is_multiple_choice": self.is_multiple_choice,
            "how_many_options_should_be_chosen": self.how_many_options_should_be_chosen,
            "correct_answer": self.correct_answer,
            "source_page": self.source_page
        }

def parse_questions_from_text(text: str, page_num: int) -> List[QuestionData]:
    """Parse questions from PDF text and return structured data"""
    questions = []
    
    # Pattern to match question headers like "Topic 1Question #1"
    question_pattern = r'Topic\s+\d+Question\s+#(\d+)'
    
    # Split text by question pattern
    question_matches = list(re.finditer(question_pattern, text))
    
    for i, match in enumerate(question_matches):
        question = QuestionData()
        question.source_page = page_num
        question.question_number = match.group(1)
        
        # Get the text for this question
        start_pos = match.end()
        end_pos = question_matches[i + 1].start() if i + 1 < len(question_matches) else len(text)
        question_text = text[start_pos:end_pos].strip()
        
        # Split question text from options
        # Look for the pattern where options start (A., B., C., D.)
        options_pattern = r'\n([A-Z])\.\s+'
        options_matches = list(re.finditer(options_pattern, question_text))
        
        if options_matches:
            # Question text is everything before the first option
            question.question_text = question_text[:options_matches[0].start()].strip()
            # Clean up question text formatting
            question.question_text = re.sub(r'\s+', ' ', question.question_text)
            
            # Extract options
            for j, option_match in enumerate(options_matches):
                option_letter = option_match.group(1)
                option_start = option_match.end()
                option_end = options_matches[j + 1].start() if j + 1 < len(options_matches) else len(question_text)
                option_text = question_text[option_start:option_end].strip()
                
                # Clean up option text (remove extra whitespace and line breaks)
                option_text = re.sub(r'\s+', ' ', option_text)
                
                question.options.append({
                    "letter": option_letter,
                    "text": option_text
                })
        else:
            # No options found, treat as the entire question text
            question.question_text = question_text
        
        # Determine if it's multiple choice based on options
        question.is_multiple_choice = len(question.options) > 0
        question.how_many_options_should_be_chosen = 1 if question.is_multiple_choice else 0
        
        questions.append(question)
    
    return questions

def extract_all_questions(pdf_path: str | Path) -> List[QuestionData]:
    """Extract all questions from PDF and return structured data"""
    all_questions = []
    
    for page_num, text in extract_pages_pdf(pdf_path):
        questions = parse_questions_from_text(text, page_num)
        all_questions.extend(questions)
    
    return all_questions

def create_dynamodb_compatible_format(questions: List[QuestionData]) -> List[Dict]:
    """Convert questions to DynamoDB-compatible format"""
    dynamodb_items = []
    
    for question in questions:
        item = {
            "PK": {"S": f"QUESTION#{question.id}"},  # Partition Key
            "SK": {"S": f"Q#{question.question_number}"},  # Sort Key
            "GSI1SK": {"S": f"Q#{question.question_number}"},
            "id": {"S": question.id},
            "question_number": {"S": question.question_number or ""},
            "question_text": {"S": question.question_text},
            "is_multiple_choice": {"BOOL": question.is_multiple_choice},
            "how_many_options_should_be_chosen": {"N": str(question.how_many_options_should_be_chosen)},
            "source_page": {"N": str(question.source_page or 0)},
            "created_at": {"S": "2024-01-09T00:00:00Z"},  # You can make this dynamic
            "exam_type": {"S": "AWS-SAA-C03"}
        }
        
        # Add options as a list
        if question.options:
            item["options"] = {
                "L": [
                    {
                        "M": {
                            "letter": {"S": opt["letter"]},
                            "text": {"S": opt["text"]}
                        }
                    } for opt in question.options
                ]
            }
        
        # Add correct answer if available
        if question.correct_answer:
            item["correct_answer"] = {"S": question.correct_answer}
        
        dynamodb_items.append(item)
    
    return dynamodb_items

def main():
    # Extract questions from PDF
    questions = extract_all_questions("./resources/aws-saa-sample-questions.pdf")
    
    print(f"Extracted {len(questions)} questions from PDF")
    print("\n" + "="*80 + "\n")
    
    # Display first question in detail
    if questions:
        question = questions[0]
        print(f"Sample Question Structure:")
        print(f"ID: {question.id}")
        print(f"Question Number: {question.question_number}")
        print(f"Source Page: {question.source_page}")
        print(f"Question Text: {question.question_text}")
        print(f"Is Multiple Choice: {question.is_multiple_choice}")
        print(f"Options to Choose: {question.how_many_options_should_be_chosen}")
        print("\nOptions:")
        for option in question.options:
            print(f"  {option['letter']}: {option['text']}")
        print("\n" + "-"*80 + "\n")
    
    # Save regular JSON format
    questions_dict = [q.to_dict() for q in questions]
    with open("extracted_questions.json", "w", encoding="utf-8") as f:
        json.dump(questions_dict, f, indent=2, ensure_ascii=False)
    
    # Save DynamoDB-compatible format
    dynamodb_format = create_dynamodb_compatible_format(questions)
    with open("questions_dynamodb_format.json", "w", encoding="utf-8") as f:
        json.dump(dynamodb_format, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Saved {len(questions)} questions in regular format to extracted_questions.json")
    print(f"✅ Saved {len(questions)} questions in DynamoDB format to questions_dynamodb_format.json")
    print(f"\n📊 Summary:")
    print(f"   - Total Questions: {len(questions)}")
    print(f"   - Multiple Choice: {sum(1 for q in questions if q.is_multiple_choice)}")
    print(f"   - Pages Processed: {len(set(q.source_page for q in questions if q.source_page))}")


if __name__ == "__main__":
    main()
