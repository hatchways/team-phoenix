from flask import Blueprint, app, jsonify, request, session, Response
from googleapiclient.discovery import build
from oauth2client import file, client
from google.oauth2 import service_account
import config
from models.user import User
from datetime import datetime
import time
import json


def covert_google_day_to_date(google_day):
    return (datetime.datetime(1899, 12, 30)
            + datetime.timedelta(days=google_day))


availability_by_day_blueprint = Blueprint(
    'availability_by_day_blueprint', __name__)


@availability_by_day_blueprint.route('/availability', methods=["POST"])
def availability_by_day():
    """
    This fucntion expects email in request body
    This function first get day (return error if day is not present)
    Then creates rfc date from day. After that It gets user's main calendar
    and find all the enents from calendar. After finding all the events it
    finds available slots via calling find_slots method.
    """
    output = dict()
    status = 422
    day = request.args.get('day', default="", type=str)
    data = json.loads(request.data.decode('utf-8'))
    unique_url = data.get("unique_url", None)
    my_user = User.fetch_user_by_url(unique_url)
    token = my_user["access_token"]
    client_email = data.get("email", None)
    if day == "" or not token or not client_email:
        output["error"] = "Missing day or Access Token or Email"
    else:
        try:
            start_time, end_time = User.get_user_start_end_time(
                client_email)
            if end_time == "00:00":
                end_time = "23:59"
            p_time = datetime.fromtimestamp(float(day))
            requested_day = p_time.strftime("%A")
            day_from_db = my_user["availability"]["days"][requested_day+"s"]
            if day_from_db:
                time_min = str(datetime(
                    p_time.year, p_time.month, p_time.day, int(start_time[0:2]), int(start_time[3:]), 00).isoformat()) + "Z"
                time_max = str(datetime(
                    p_time.year, p_time.month, p_time.day, int(end_time[0:2]), int(end_time[3:]), 59).isoformat()) + "Z"
                credentials = client.AccessTokenCredentials(
                    token, 'my-user-agent')
                service = build('calendar', 'v3', credentials=credentials)
                result = service.calendarList().list().execute()
                calendar_id = result['items'][0]['id']
                body = {"timeMin": time_min,
                        "items": [{"id": calendar_id}], "timeMax": time_max}
                calendars_result = service.freebusy().query(body=body).execute()
                free_slots_arr = find_slots(
                    calendars_result["calendars"].get(client_email).get("busy"), time_min, time_max)
                free_slots_in_ts = convert_to_unix_time(free_slots_arr)
                output["result"] = free_slots_in_ts
                status = 200
            else:
                output["result"] = []
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
    return jsonify(output), status


def find_slots(busy_time_array, day_start, day_end):
    """
    This method finds the availble slots from busy slots
    from user's canlendar.
    """
    availabile_slots = []
    counter = 0
    length = len(busy_time_array)-1
    if length >= 0:
        if day_start != busy_time_array[counter]["start"]:
            availabile_slots.append(
                {"start": day_start, "end": busy_time_array[counter]["start"]})
        for b_time in busy_time_array:
            if counter < length:
                availabile_slots.append({"start": (b_time["end"]), "end": (
                    busy_time_array[counter+1]["start"])})
            counter += 1
        if day_end != busy_time_array[counter-1]["end"]:
            availabile_slots.append(
                {"start": busy_time_array[counter-1]["end"], "end": day_end})
    else:
        availabile_slots.append({"start": day_start, "end": day_end})
    return availabile_slots


def convert_to_unix_time(array):
    """
    This function convert rfc time to unix time stamp
    """
    array_with_unix_time = []
    for date in array:
        start = time.mktime(datetime.strptime(date["start"][:-1],
                                              "%Y-%m-%dT%H:%M:%S").timetuple())
        end = time.mktime(datetime.strptime(date["end"][:-1],
                                            "%Y-%m-%dT%H:%M:%S").timetuple())
        array_with_unix_time.append({"start": start, "end": end})
    return array_with_unix_time
