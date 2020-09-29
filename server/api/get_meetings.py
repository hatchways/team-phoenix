from flask import Blueprint, app, jsonify

import config
from models.base import BaseModel

get_meetings_blueprint = Blueprint('get_meetings', __name__)


@get_meetings_blueprint.route('/meetings/<user_id>', methods=["POST", "GET"])
def meetings(user_id):
    output = dict()
    try:
        loaded = BaseModel.load_many_by_user(user_id, "Meeting")
        output['meetings'] = []
        for data in loaded:
            output['meetings'].append(data)
            if config.is_dev_environment():
                print(f"DEBUG: Loading the follow from DB: {data}")
        status = 200
        if len(output['meetings']) == 0:
            status = 204
    except Exception as e:
        # TODO: Make the Exception handling less broad
        output['error'] = f'{e}'
        status = 400
    return jsonify(output), status
