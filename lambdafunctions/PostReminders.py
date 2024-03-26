import boto3
from boto3.dynamodb.conditions import Attr
import random

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Reminders')

def lambda_handler(event, context):
    user_id = int(event['user_id'])
    reminder_id = random.randint(1,1000000)
    reminder_type = event['reminder_type']
    date = event['date']
    time = event['time']
    num_reminders = event['num_reminders']
    interval_ms = event['interval_ms']
    try:
        response = table.put_item(
            Item = {
                'user_id' : user_id,
                'reminder_id': reminder_id,
                'is_active': True,
                'reminder_type': reminder_type,
                'date': date,
                'time':time,
                'num_reminders': num_reminders,
                'interval_ms': interval_ms
            }
        )
        return{
            'statusCode': 200
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }