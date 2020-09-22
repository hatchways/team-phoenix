from flask import Blueprint, app, jsonify, request, session
from apiclient.discovery import build
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
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
            SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
            flow = InstalledAppFlow.from_client_secrets_file(
                '/Users/simerpreetsinghjassal/Desktop/team-phoenix/server/api/client_secret.json', SCOPES)
            flow.fetch_token(code=[session["code"]])
            build('calendar', 'v3', credentials=flow.credentials)
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
    return jsonify(output), status
