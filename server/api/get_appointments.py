from flask import Blueprint, app, jsonify
from models.appointment import Appointment
import config
from models.base import BaseModel

get_appointments_blueprint = Blueprint('get_appointments', __name__)


@get_appointments_blueprint.route('/appointments/<user_id>', methods=["POST", "GET"])
def appointments(user_id):
    output = dict()
    try:
        loaded = BaseModel.load_many_by_user(user_id, "Appointment")
        output['appointments'] = []
        for data in loaded:
            output['appointments'].append(data)
            if config.is_dev_environment():
                print(f"DEBUG: Loading the follow from DB: {data}")
        status = 200
        if len(output['appointments']) == 0:
            status = 204
    except Exception as e:
        # TODO: Make the Exception handling less broad
        output['error'] = f'{e}'
        status = 400
    return jsonify(output), status
