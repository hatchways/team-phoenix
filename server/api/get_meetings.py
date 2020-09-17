from flask import Blueprint, app, jsonify

import config
from models.meeting import Meeting

get_meetings_blueprint = Blueprint('get_meetings', __name__)


@get_meetings_blueprint.route('/meetings/<user_id>', methods=["POST", "GET"])
def meetings(user_id):
    output = dict()
    try:
        loaded = Meeting.load(user_id)
        output['meetings'] = []
        for data in loaded:
            output['meetings'].append(f"{data}")
            if config.is_dev_environment():
                print(f"DEBUG: Loading the follow from DB: {data}")
    except Exception as e:
        # TODO: Make the Exception handling less broad
        output['error'] = f'{e}'
    return output
