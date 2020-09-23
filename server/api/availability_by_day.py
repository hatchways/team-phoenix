from flask import Blueprint, app, jsonify, request, session
from googleapiclient.discovery import build
from oauth2client import file, client
from google.oauth2 import service_account
import config
from models.user import User
#import pandas
import datetime
from time import gmtime


def covert_google_day_to_date(google_day):
    return (datetime.datetime(1899, 12, 30)
            + datetime.timedelta(days=google_day))


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
            p_time = datetime.datetime.fromtimestamp(float(day))
            time_min = datetime.datetime(
                p_time.year, p_time.month, p_time.day, 00, 00, 00).isoformat()
            time_max = datetime.datetime(
                p_time.year, p_time.month, p_time.day, 23, 59, 59).isoformat()
            user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            credentials = client.AccessTokenCredentials(
                str(session.get("access_token")), 'my-user-agent')
            service = build('calendar', 'v3', credentials=credentials)

            result = service.calendarList().list().execute()
            calendar_id = result['items'][0]['id']
            print(p_time)
            body = {"timeMin": str(time_min)+"-05:00",
                    "items": [{"id": calendar_id}], "timeMax": str(time_max)+"-05:00"}
            calendars_result = service.freebusy().query(body=body).execute()

            # print(result["item"][0])
            return jsonify({"result": calendars_result})
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
    return jsonify(output), status
