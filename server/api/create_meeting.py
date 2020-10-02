
from flask import Blueprint, app, jsonify, request
from bson import ObjectId
from models.meeting import Meeting
import config
import json
from models.base import BaseModel


create_meeting_blueprint = Blueprint('create_meeting', __name__)


@create_meeting_blueprint.route('/meeting', methods=["POST"])
 """
   This functin accepted meeting details from post request
   and saves them in the db.
    """
def add_meeting():
   
    output = dict()
    status = 422
   
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    if not data:
        return jsonify({"error": "Missing data to save"}), status
    try:
        user_id = data['user_id']
        name = data['name']
        event_type = data['event_type']
        description = data['description']
        duration = data['duration']

        newMeeting = Meeting(user_id,name,event_type,description,duration)
        result = Meeting.save(newMeeting)
        if result:
            output["success"] = f"meeting {data} saved"
            status = 200
        else:
            output["error"] = "Could not save"
        return jsonify(output), status
    except Exception as e:
        output['error'] = f'{e}'
        status = 500
        return jsonify(output), status