"""
Lambda handler for getting a single question by ID
"""
import json
import boto3
from typing import Dict, Any


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Lambda handler for GET /questions/{id} endpoint
    """
    
    try:
        # Extract question ID from path parameters
        question_id = event['pathParameters']['id']
        
        if not question_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Question ID is required'
                })
            }
        
        # Initialize DynamoDB client
        dynamodb = boto3.client('dynamodb')
        table_name = 'aws-mock-questions'  # This would come from environment variable
        
        # Get question from DynamoDB
        response = dynamodb.get_item(
            TableName=table_name,
            Key={
                'PK': {'S': f'QUESTION#{question_id}'}
            }
        )
        
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Question not found'
                })
            }
        
        # Format response
        item = response['Item']
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
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(question)
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
