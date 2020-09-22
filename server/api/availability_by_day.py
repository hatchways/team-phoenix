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

            credentials = client.AccessTokenCredentials(
                'ACCESS_TOKEN', 'USER_AGENT')
            service = build(
                'calendar', 'v3', credentials=credentials)
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
    return jsonify(output), status
