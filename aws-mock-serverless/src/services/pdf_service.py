"""
PDF processing service for extracting questions from AWS certification PDFs
"""
from pathlib import Path
from pypdf import PdfReader
import re
from typing import List, Generator, Tuple

from ..models.question import Question, QuestionOption


class PDFService:
    """Service for processing PDF files and extracting questions"""
    
    def __init__(self):
        self.question_pattern = r'Topic\s+\d+Question\s+#(\d+)'
        self.options_pattern = r'\n([A-Z])\.\s+'
    
    def extract_pages(self, pdf_path: str | Path) -> Generator[Tuple[int, str], None, None]:
        """Extract text from PDF pages"""
        path = Path(pdf_path)
        reader = PdfReader(path)
        
        # Handle encrypted PDFs
        if getattr(reader, "is_encrypted", False):
            try:
                reader.decrypt("")
            except Exception as e:
                raise RuntimeError(f"Cannot open encrypted PDF: {path}") from e
        
        for i, page in enumerate(reader.pages, start=1):
            text = page.extract_text() or ""
            yield i, text
    
    def parse_questions_from_text(self, text: str, page_num: int) -> List[Question]:
        """Parse questions from PDF text and return structured data"""
        questions = []
        
        # Find all question headers
        question_matches = list(re.finditer(self.question_pattern, text))
        
        for i, match in enumerate(question_matches):
            question_number = match.group(1)
            
            # Get the text for this question
            start_pos = match.end()
            end_pos = question_matches[i + 1].start() if i + 1 < len(question_matches) else len(text)
            question_text = text[start_pos:end_pos].strip()
            
            # Parse question content and options
            question_content, options = self._extract_question_and_options(question_text)
            
            # Create question object
            question = Question.create_new(
                question_number=question_number,
                question_text=question_content,
                options=options,
                source_page=page_num
            )
            
            questions.append(question)
        
        return questions
    
    def _extract_question_and_options(self, question_text: str) -> Tuple[str, List[QuestionOption]]:
        """Extract question content and options from text"""
        options_matches = list(re.finditer(self.options_pattern, question_text))
        options = []
        
        if options_matches:
            # Question text is everything before the first option
            question_content = question_text[:options_matches[0].start()].strip()
            question_content = re.sub(r'\s+', ' ', question_content)
            
            # Extract options
            for j, option_match in enumerate(options_matches):
                option_letter = option_match.group(1)
                option_start = option_match.end()
                option_end = options_matches[j + 1].start() if j + 1 < len(options_matches) else len(question_text)
                option_text = question_text[option_start:option_end].strip()
                
                # Clean up option text
                option_text = re.sub(r'\s+', ' ', option_text)
                
                options.append(QuestionOption(letter=option_letter, text=option_text))
        else:
            # No options found, treat as the entire question text
            question_content = question_text
        
        return question_content, options
    
    def extract_all_questions(self, pdf_path: str | Path) -> List[Question]:
        """Extract all questions from PDF file"""
        all_questions = []
        
        for page_num, text in self.extract_pages(pdf_path):
            questions = self.parse_questions_from_text(text, page_num)
            all_questions.extend(questions)
        
        return all_questions
