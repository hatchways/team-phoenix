from models.appointment import Appointment
from flask import jsonify, Blueprint, request
from models.user import User
from googleapiclient.discovery import build
from oauth2client import file, client
from os import environ
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To
import json
import os
import datetime

create_appointment_blueprint = Blueprint('create_appointment', __name__)


def send_email_to_organizaer(to_email, start, summary, timezone):
    convert_date = datetime.datetime.strptime(start[:19], '%Y-%m-%dT%H:%M:%S')
    month = convert_date.strftime("%B")
    day = convert_date.day
    year = convert_date.year
    try:
        message = Mail(from_email='teamphoenix1900@gmail.com', to_emails=To(to_email), subject='Calendar invite ' +
                       summary, html_content=f'<strong>You have been scheduled an appointment on {month} {day}th, {year} {timezone} time</strong>')

        sg = SendGridAPIClient(environ['SENDGRID_API_KEY'])
        response = sg.send(message)
        print(response.status_code, response.body, response.headers)
    except Exception as e:
        print(e.body)


@create_appointment_blueprint.route('/create-appointment', methods=["POST"])
def create_appointment():
    output = dict()
    status = 500
    try:
        data = json.loads(request.data.decode('utf-8'))
        unique_url = data["unique_url"]
        my_user = User.fetch_user_by_url(unique_url)
        token = my_user["access_token"]

        appointment_data = data["appointment"]
        if all(key in appointment_data for key in ("summary", "description", "start", "end", "attendees")):
            appointment = Appointment(appointment_data)
            appointment.save("appointment")
            del appointment_data["user_id"]
            appointment_data["reminders"] = {"useDefault": False, "overrides": [
                {'method': 'email', 'minutes': 24 * 60}, {'method': 'popup', 'minutes': 10}, ]}
            credentials = client.AccessTokenCredentials(
                token, 'my-user-agent')
            service = build('calendar', 'v3', credentials=credentials)
            event = service.events().insert(calendarId='primary',
                                            body=appointment_data, sendUpdates='all').execute()
            send_email_to_organizaer(
                appointment_data["attendees"][0]["email"], appointment_data["start"]["dateTime"], appointment_data["summary"], appointment_data["start"]["timeZone"])
            output["result"] = "Appointment successfully created."
            status = 200
        else:
            status = 400
            output["result"] = "Missing Input"
    except Exception as e:
        output["error"] = f"{e}"
    return jsonify(output), status
