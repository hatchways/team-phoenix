from models.appointment import Appointment
from flask import jsonify, Blueprint, request
import json

create_appointment_blueprint = Blueprint('create_appointment', __name__)


@create_appointment_blueprint.route('/create_appointment', methods=["POST"])
def create_appointment():
    output = dict()
    status = 500
    try:
        data = json.loads(request.data.decode('utf-8'))
        if all(key in data for key in ("name", "meeting_id", "email", "time")):
            appointment = Appointment(data)
            appointment.save("appointment")
            output["result"] = "Appointment successfully created."
            status = 200
        else:
            status = 400
            output["result"] = "Missing Input"
    except Exception as e:
        output["error"] = f"{e}"
    return jsonify(output), status
