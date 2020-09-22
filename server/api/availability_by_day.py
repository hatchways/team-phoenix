from flask import Blueprint, app, jsonify, request, session
from googleapiclient.discovery import build
from oauth2client import file, client
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2 import service_account
import config
from models.user import User
availability_by_day_blueprint = Blueprint(
    'availability_by_day_blueprint', __name__)


@availability_by_day_blueprint.route('/availability', methods=["GET"])
def availability_by_day():
    output = dict()
    status = 422
    day = request.args.get('day', default="", type=str)
    if day == "":
        output["error"] = "Missing day"
    else:
        try:
            user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            credentials = client.AccessTokenCredentials(
                str(session.get("access_token")), 'my-user-agent')
            service = build('calendar', 'v3', credentials=credentials)
            calendars_result = service.calendarList().list().execute()

            # calendars = calendars_result.get('items', []).execute()

            # print(result["item"][0])
            return jsonify({"result": calendars_result})
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
    return jsonify(output), status
