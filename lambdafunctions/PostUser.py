import boto3
from boto3.dynamodb.conditions import Attr
import random

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserData')

def lambda_handler(event, context):
    user_id = random.randint(1,1000000)
    try:
        # Scan DynamoDB table for the provided number
        response = table.put_item(
            Item = {
                'user_id': user_id,
                'username': str(event['name']),
                'mobile_number':event['number']
            }
        )
        return{
            'statusCode': 200,
            'user_id': user_id,
                'name': str(event['name']),
                'number':event['number']
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }