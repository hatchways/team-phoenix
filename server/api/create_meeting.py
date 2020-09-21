from flask import Blueprint, jsonify

from models.meeting import Meeting

create_meeting_blueprint = Blueprint('create_meeting', __name__)


@create_meeting_blueprint.route('/meeting/<user_id>/<int:duration>', methods=["POST", "GET"])
def meeting(user_id, duration):
    output = dict()
    try:
        new_meeting = Meeting(user_id, duration)
        new_meeting.save()
        output['meeting'] = {'user': new_meeting['user_id'], 'duration': new_meeting['duration']}
        status = 200
    except ValueError as e:
        output['error'] = f'{e}'
        status = 400
    return jsonify(output), status
