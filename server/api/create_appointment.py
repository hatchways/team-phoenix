from models.appointment import Appointment
from flask import jsonify, Blueprint, request
from googleapiclient.discovery import build
from oauth2client import file, client
import json

create_appointment_blueprint = Blueprint('create_appointment', __name__)


@create_appointment_blueprint.route('/create-appointment', methods=["POST"])
def create_appointment():
    output = dict()
    status = 500
    try:
        data = json.loads(request.data.decode('utf-8'))
        print(data)
        token = data["access_token"]

        appointment_data = data["appointment"]
        if all(key in appointment_data for key in ("summary", "description", "start", "end", "attendees")):
            appointment = Appointment(appointment_data)
            appointment.save("appointment")
            appointment_data["recurrence"] = ['RRULE:FREQ=DAILY;COUNT=2']
            appointment_data["reminders"] = {"useDefault": False, "overrides": [
                {'method': 'email', 'minutes': 24 * 60}, {'method': 'popup', 'minutes': 10}, ]}
            credentials = client.AccessTokenCredentials(
                token, 'my-user-agent')
            service = build('calendar', 'v3', credentials=credentials)
            event = service.events().insert(calendarId='primary',
                                            body=appointment_data).execute()
            print('Event created: %s' % (event.get('htmlLink')))
            output["result"] = "Appointment successfully created."
            status = 200
        else:
            status = 400
            output["result"] = "Missing Input"
    except Exception as e:
        output["error"] = f"{e}"
    return jsonify(output), status
