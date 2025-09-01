# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack AWS Solutions Architect Associate certification mock test platform with React frontend and Python backend. The system extracts questions from PDFs, stores them in DynamoDB, and serves them through AWS Lambda/API Gateway.

## Architecture

### Data Flow
```
PDF Files → Python Backend → Text Extraction → Question Parsing → DynamoDB Storage
                                                                  ↓
AWS Lambda ← API Gateway ← REST API ← React Frontend ← JSON Questions
```

### Current State
- **Frontend**: Complete React app with glassmorphic UI, multiple themes, question navigation
- **Backend**: Basic PDF text extraction implemented (pypdf), question parsing skeleton exists
- **Infrastructure**: CloudFormation templates not yet implemented
- **API**: Frontend currently uses static JSON, needs API integration

## Common Commands

### Frontend Development
```bash
cd aws-mock-fe
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development
```bash
cd aws-mock-be
uv run python main.py  # Run PDF extraction
uv sync              # Install/update dependencies
```

### Project Structure
```
aws-mock-test/
├── aws-mock-fe/          # React frontend (complete)
│   ├── src/
│   │   ├── components/   # React components (TestBoard, QuestionCard, etc.)
│   │   ├── contexts/    # React Context (QuestionContext, ColorSchemeContext)
│   │   ├── hooks/       # Custom hooks (useQuestions, useNavigation)
│   │   └── data/        # Static questions.json (temporary)
│   ├── package.json     # React 19.1.1, Vite 7.1.2, Tailwind CSS 4.1.12
│   └── vite.config.js   # Vite configuration
├── aws-mock-be/          # Python backend (PDF processing)
│   ├── main.py          # PDF text extraction with pypdf
│   ├── parser.py        # Question parsing skeleton (incomplete)
│   ├── pyproject.toml   # Python 3.12+, pypdf 6.0.0+
│   └── resources/       # AWS certification PDFs
├── parser.py            # Root-level question parsing utility
└── CLAUDE.md            # This file
```

## Key Architecture Patterns

### Frontend
- **Component Architecture**: Modular React components with clear separation
- **Context API**: Global state management for questions and themes
- **Custom Hooks**: Encapsulated logic for question management and theming
- **Responsive Design**: Mobile-first with glassmorphic UI elements

### Backend
- **Service-Oriented**: PDF processing as separate microservice
- **Generator Pattern**: Memory-efficient page-by-page PDF processing
- **Error Handling**: Graceful handling of encrypted PDFs

### Data Models
Questions follow this structure:
```json
{
  "id": 1,
  "question": "Question text",
  "options": [{"label": "Option A", "id": 1}, ...],
  "correctAnswer": 3,
  "explanation": "Explanation text",
  "flag": false,
  "selectedAnswer": null
}
```

## Development Notes

### Current Implementation Status
- ✅ Frontend UI complete with modern design
- ✅ Basic PDF text extraction working
- ✅ Question navigation and selection functional
- ✅ Color scheme switching implemented
- ✅ Test results and review functionality complete
- 🔄 Question parsing from PDF text needs completion
- 🔄 CloudFormation templates need creation
- 🔄 Lambda functions for backend services needed
- 🔄 API Gateway endpoints need implementation
- 🔄 Frontend-backend API integration required

### Key Files to Understand
- `aws-mock-fe/src/App.jsx` - Main application logic
- `aws-mock-fe/src/contexts/QuestionContext.jsx` - Question state management
- `aws-mock-be/main.py:4` - Core PDF extraction function
- `parser.py` - Question parsing logic (incomplete)
- `aws-mock-fe/package.json` - Frontend dependencies and scripts

### Technology Stack
- **Frontend**: React 19.1.1, Vite 7.1.2, Tailwind CSS 4.1.12
- **Backend**: Python 3.12+, uv package manager, pypdf 6.0.0+
- **Planned Cloud**: AWS CloudFormation, API Gateway, Lambda, DynamoDB