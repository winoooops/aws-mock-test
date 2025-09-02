# AWS Mock Test - Serverless Services

## 🎯 Overview
Cloud-native serverless service for processing AWS certification question PDFs and providing REST API endpoints. Built with Python following SOLID principles and industry-standard serverless architecture patterns.

## 🏗️ Architecture

![Deployment Workflow](docs_assets/deployment-workflow.png)

This service implements a **layered serverless architecture** that separates:
- **Infrastructure Layer**: CloudFormation templates
- **Application Layer**: Python Lambda functions  
- **Data Layer**: DynamoDB with migration scripts

## 📁 Project Structure

```
aws-mock-serverless/
├── src/                    # Application source code
│   ├── handlers/           # Lambda function entry points
│   │   ├── get_questions.py    # GET /questions endpoint
│   │   └── get_question.py     # GET /questions/{id} endpoint
│   ├── services/           # Business logic layer
│   │   ├── pdf_service.py      # PDF processing service
│   │   └── question_service.py # Question data operations
│   ├── models/             # Data models and schemas
│   │   └── question.py         # Question data model
│   └── utils/              # Shared utilities
│       └── db_utils.py         # DynamoDB helper functions
├── infrastructure/         # CloudFormation templates (planned)
├── resources/              # Source PDF files
│   └── aws-saa-sample-questions.pdf
├── docs_assets/            # Documentation assets
│   └── deployment-workflow.png # Architecture diagrams
├── main.py                 # Local development script
└── pyproject.toml          # Python dependencies
```

## 🚀 Quick Start

### **Local Development**
```bash
# Install dependencies
uv sync

# Process PDFs and generate question data
uv run python main.py

# Output files:
# - extracted_questions.json (human-readable)
# - questions_dynamodb_format.json (AWS-ready)
```

### **Generated Data Structure**
```json
{
  "id": "uuid4-string",
  "question_number": "1", 
  "question_text": "AWS question content...",
  "options": [
    {"letter": "A", "text": "Option A text"},
    {"letter": "B", "text": "Option B text"}
  ],
  "correct_count": 1,
  "source_page": 1,
  "exam_type": "AWS-SAA-C03"
}
```

## 🏛️ SOLID Principles Implementation

| Principle | Implementation |
|-----------|----------------|
| **SRP** | Each service has one responsibility (PDF processing, question management, DB operations) |
| **OCP** | New question sources can be added without modifying existing parsers |
| **LSP** | Different PDF libraries can be substituted without changing interfaces |
| **ISP** | Lambda handlers only depend on services they actually use |
| **DIP** | Services depend on abstractions, not concrete implementations |

## 📊 Industry Standards Followed

### **✅ Serverless Best Practices**
- **Layered Architecture**: Clear separation between handlers, services, and models
- **Infrastructure as Code**: CloudFormation for all AWS resources
- **Environment Separation**: Development, staging, production environments
- **Stateless Functions**: Lambda functions don't maintain state between invocations

### **✅ AWS Best Practices**
- **Single Table Design**: DynamoDB with composite keys and GSI
- **Least Privilege IAM**: Minimal permissions for each Lambda function
- **Error Handling**: Proper exception handling and logging
- **CORS Configuration**: Secure cross-origin resource sharing

## 🔄 Data Processing Pipeline

```
PDF Input → Text Extraction → Question Parsing → Data Validation → JSON Output
     ↓             ↓               ↓              ↓             ↓
  S3 Storage → Lambda Trigger → Question Service → DynamoDB → API Response
```

## 📈 Current Status

### **✅ Completed**
- PDF text extraction with pypdf
- Question parsing with regex patterns  
- Data model design with proper typing
- DynamoDB-compatible format generation
- Industry-standard file structure
- SOLID principles implementation

### **🔄 Next Steps**
- CloudFormation template creation
- Lambda function deployment
- API Gateway configuration
- Data migration scripts
- Integration testing

## 🛠️ Dependencies

```toml
[project]
dependencies = [
    "pypdf>=6.0.0",      # PDF processing
    "boto3>=1.34.0",     # AWS SDK (for Lambda deployment)
]
```

## 📚 Related Documentation

- [Root Project Overview](../README.md)
- [Frontend Documentation](../aws-mock-fe/CLAUDE.md)
- [Architecture Decisions](../CLAUDE.md)

---

**Status**: Foundation Complete - Ready for Cloud Migration  
**Next Phase**: CloudFormation Infrastructure Setup