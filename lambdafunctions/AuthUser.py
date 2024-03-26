import boto3
from boto3.dynamodb.conditions import Attr
import phonenumbers

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserData')

def lambda_handler(event, context):
    number_to_check = str(event['number'])
    name = event['name']
    try:
        parsed_number = phonenumbers.parse(number_to_check, "US")
        if not phonenumbers.is_valid_number(parsed_number) or name is None:
            return {
                'statusCode': 400,
                'body': 'Invalid phone number format'
            }
        # Scan DynamoDB table for the provided number
        response = table.scan(
            FilterExpression=Attr("mobile_number").eq(number_to_check)
        )
        
        # If any items are found, the number exists in the database
        if response['Count'] > 0:
            return {
                'statusCode': 200,
                'user_id' : response['Items'][0]["user_id"],
                'username' : response['Items'][0]["username"],
                'mobile_number' : response['Items'][0]["mobile_number"]
            }
        else:
            return {
                'statusCode': 404,
                'body': 'Number does not exist in the database'
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }
