from flask import Blueprint, app, jsonify
import config
from models.base import BaseModel
from models.meeting import Meeting
get_meetings_blueprint = Blueprint('get_meetings', __name__)
@get_meetings_blueprint.route('/meetings/<user_id>', methods=["GET"])
def meetings(user_id):
    output = dict()
    try:
        loaded = BaseModel.load_many_by_user(user_id, "Meeting")
        output['meetings'] = []
        for meeting in loaded:
            meeting_object = Meeting(
                user_id=meeting['user_id'],
                name=meeting['name'],
                event_type=meeting['event_type'],
              description=meeting['description'],
              duration=meeting['duration'])


            output['meetings'].append(meeting_object)
            if config.is_dev_environment():
                print(f"DEBUG: Loading the follow from DB: {meeting_object}")
        status = 200
        if len(output['meetings']) == 0:
            status = 204
    except Exception as e:
        # TODO: Make the Exception handling less broad
        output['error'] = f'{e}'
        status = 400
    return jsonify(output), status