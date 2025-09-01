# AWS Mock Test Backend - PDF Processing Service

## Project Overview
Python backend service for extracting AWS certification questions from PDF files and preparing data for DynamoDB storage. This service processes PDFs, extracts text content, and structures it for the frontend application.

## Technology Stack
- **Language**: Python 3.12+
- **PDF Processing**: pypdf 6.0.0+
- **Package Management**: uv
- **Deployment**: AWS Lambda (planned)

## Current Implementation
- **PDF Extraction**: `extract_pages_pdf()` function processes PDF files page by page
- **Error Handling**: Handles encrypted PDFs with automatic decryption attempts
- **Text Processing**: Extracts raw text from PDF pages

## Project Structure
```
aws-mock-be/
├── main.py              # Main PDF extraction logic
├── pyproject.toml       # Python project configuration
├── uv.lock             # Dependency lock file
├── resources/          # PDF files for processing
│   ├── aws-saa-sample-questions.pdf
│   ├── saa-c03-999.pdf
│   └── saa-c03.pdf
└── CLAUDE.md           # This file
```

## Current Features
✅ **PDF Text Extraction**: Extracts text from PDF pages
✅ **Error Handling**: Proper exception handling for file operations
✅ **Generator Pattern**: Memory-efficient page-by-page processing

## Planned Enhancements
🔄 **Question Parsing**: Extract individual questions and answers from raw text
🔄 **Data Structuring**: Format questions for DynamoDB storage
🔄 **AWS Integration**: Lambda functions for cloud deployment
🔄 **API Endpoints**: RESTful APIs for frontend consumption
🔄 **Database Operations**: DynamoDB CRUD operations
🔄 **Validation**: Question format and content validation

## Commands
- **Run extraction**: `python main.py`
- **Install dependencies**: `uv sync`
- **Add dependencies**: `uv add <package>`

## Data Flow
1. **PDF Input**: AWS certification PDFs in resources/
2. **Text Extraction**: pypdf extracts raw text page by page
3. **Question Parsing**: (Future) Parse questions, options, and answers
4. **Data Structuring**: (Future) Format for DynamoDB storage
5. **API Integration**: (Future) Lambda functions serve data to frontend

## AWS Integration Plan
- **Lambda Functions**: Serverless PDF processing and question serving
- **DynamoDB Tables**: Question storage with proper indexing
- **API Gateway**: RESTful endpoints for frontend
- **CloudFormation**: Infrastructure as Code deployment
- **S3 Storage**: PDF file storage and processing queue

## Key Files
- `main.py:4` - Core PDF extraction function
- `main.py:19` - Main execution logic
- `pyproject.toml:7` - Dependencies configuration

## Development Notes
- Current implementation extracts raw text only
- Next phase: Question parsing and structuring
- Uses generator pattern for memory efficiency
- Handles encrypted PDFs gracefully