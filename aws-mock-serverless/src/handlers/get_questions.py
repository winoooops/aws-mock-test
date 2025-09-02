"""
Lambda handler for getting all questions
"""
import json
import boto3
from typing import Dict, Any

# This would be imported in actual Lambda environment
# from ..services.question_service import QuestionService


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Lambda handler for GET /questions endpoint
    
    Query Parameters:
    - exam_type: Filter by exam type (optional)
    - limit: Number of questions to return (optional)
    """
    
    try:
        # Extract query parameters
        query_params = event.get('queryStringParameters') or {}
        exam_type = query_params.get('exam_type', 'AWS-SAA-C03')
        limit = int(query_params.get('limit', 50))
        
        # Initialize DynamoDB client
        dynamodb = boto3.client('dynamodb')
        table_name = 'aws-mock-questions'  # This would come from environment variable
        
        # Query DynamoDB
        response = dynamodb.query(
            TableName=table_name,
            IndexName='GSI1',  # Global Secondary Index for exam type
            KeyConditionExpression='GSI1PK = :exam_type',
            ExpressionAttributeValues={
                ':exam_type': {'S': f'EXAM#{exam_type}'}
            },
            Limit=limit
        )
        
        # Format response
        questions = []
        for item in response['Items']:
            question = {
                'id': item['id']['S'],
                'question_number': item['question_number']['S'],
                'question_text': item['question_text']['S'],
                'correct_count': int(item['correct_count']['N']),
                'source_page': int(item['source_page']['N']),
                'exam_type': item['exam_type']['S']
            }
            
            # Add options if present
            if 'options' in item:
                question['options'] = [
                    {
                        'letter': opt['M']['letter']['S'],
                        'text': opt['M']['text']['S']
                    }
                    for opt in item['options']['L']
                ]
            
            questions.append(question)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Configure properly for production
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'questions': questions,
                'count': len(questions),
                'exam_type': exam_type
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }
