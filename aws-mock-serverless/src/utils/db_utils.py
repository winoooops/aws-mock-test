"""
Database utility functions for DynamoDB operations
"""
import boto3
from typing import List, Dict, Any
import json


class DynamoDBUtils:
    """Utility class for DynamoDB operations"""
    
    def __init__(self, table_name: str):
        self.dynamodb = boto3.client('dynamodb')
        self.table_name = table_name
    
    def batch_write_items(self, items: List[Dict[str, Any]], batch_size: int = 25) -> None:
        """
        Write items to DynamoDB in batches
        DynamoDB batch_write_item has a limit of 25 items per request
        """
        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]
            
            request_items = {
                self.table_name: [
                    {'PutRequest': {'Item': item}}
                    for item in batch
                ]
            }
            
            try:
                response = self.dynamodb.batch_write_item(RequestItems=request_items)
                
                # Handle unprocessed items (retry logic would go here)
                if response.get('UnprocessedItems'):
                    print(f"Warning: {len(response['UnprocessedItems'])} items were not processed")
                    
            except Exception as e:
                print(f"Error writing batch {i//batch_size + 1}: {e}")
                raise
    
    def create_table_if_not_exists(self, table_schema: Dict[str, Any]) -> bool:
        """Create DynamoDB table if it doesn't exist"""
        try:
            self.dynamodb.describe_table(TableName=self.table_name)
            print(f"Table {self.table_name} already exists")
            return False
        except self.dynamodb.exceptions.ResourceNotFoundException:
            # Table doesn't exist, create it
            self.dynamodb.create_table(**table_schema)
            print(f"Created table {self.table_name}")
            return True
    
    def export_table_to_json(self, output_path: str) -> None:
        """Export entire table to JSON file"""
        paginator = self.dynamodb.get_paginator('scan')
        
        all_items = []
        for page in paginator.paginate(TableName=self.table_name):
            all_items.extend(page['Items'])
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(all_items, f, indent=2, ensure_ascii=False)
        
        print(f"Exported {len(all_items)} items to {output_path}")


def build_response(status_code: int, body: Dict[str, Any], 
                  headers: Dict[str, str] = None) -> Dict[str, Any]:
    """Build standardized API Gateway response"""
    default_headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
    
    if headers:
        default_headers.update(headers)
    
    return {
        'statusCode': status_code,
        'headers': default_headers,
        'body': json.dumps(body)
    }
