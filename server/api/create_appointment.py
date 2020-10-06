
from flask import Blueprint, app, jsonify, request
from bson import ObjectId
from models.appointment import Appointment
import config
import json
from models.base import BaseModel


create_appointment_blueprint = Blueprint('create_appointment', __name__)


@create_appointment_blueprint.route('/appointment', methods=["POST"])
def add_appointment():
    """
    This functin accepted appointment details from post request
    and saves them in the db.
    """
    output = dict()
    status = 422

    data = json.loads(request.data.decode('utf-8'))
    print(data)
    if not data:
        return jsonify({"error": "Missing data to save"}), status
    try:
        meeting_id = data['meeting_id']
        name = data['name']
        email = data['email']
        datetime = data['datetime']
        timezone = data['timezone']

        newappointment = Appointment(meeting_id, name, email, datetime, timezone)
        result = Appointment.save(newappointment)
        if result:
            output["success"] = f"appointment {data} saved"
            status = 200
        else:
            output["error"] = "Could not save"
        return jsonify(output), status
    except Exception as e:
        output['error'] = f'{e}'
        status = 500
        return jsonify(output), status
