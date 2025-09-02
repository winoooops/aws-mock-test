"""
Main script for local development and testing
This script demonstrates the PDF processing pipeline locally
"""
from src.services.pdf_service import PDFService
from src.services.question_service import QuestionService


def main():
    """Main function for local PDF processing and testing"""
    
    # Initialize services
    pdf_service = PDFService()
    question_service = QuestionService()
    
    # Extract questions from PDF
    print("🔄 Processing PDF...")
    questions = pdf_service.extract_all_questions("./resources/aws-saa-sample-questions.pdf")
    
    print(f"✅ Extracted {len(questions)} questions from PDF")
    print("\n" + "="*80 + "\n")
    
    # Display first question as example
    if questions:
        question = questions[0]
        print(f"📋 Sample Question Structure:")
        print(f"   ID: {question.id}")
        print(f"   Question Number: {question.question_number}")
        print(f"   Source Page: {question.source_page}")
        print(f"   Question Text: {question.question_text[:100]}...")
        print(f"   Correct Count: {question.correct_count}")
        print(f"   Options: {len(question.options)}")
        
        for option in question.options[:2]:  # Show first 2 options
            print(f"      {option.letter}: {option.text[:50]}...")
        
        print("\n" + "-"*80 + "\n")
    
    # Save in both formats
    question_service.save_questions_to_json(questions, "extracted_questions.json")
    question_service.save_questions_to_dynamodb_format(questions, "questions_dynamodb_format.json")
    
    print(f"💾 Saved questions in regular format: extracted_questions.json")
    print(f"💾 Saved questions in DynamoDB format: questions_dynamodb_format.json")
    
    print(f"\n📊 Summary:")
    print(f"   - Total Questions: {len(questions)}")
    print(f"   - With Options: {sum(1 for q in questions if len(q.options) > 0)}")
    print(f"   - Pages Processed: {len(set(q.source_page for q in questions))}")
    print(f"   - Exam Type: {questions[0].exam_type if questions else 'N/A'}")


if __name__ == "__main__":
    main()