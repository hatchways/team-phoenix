# from flask import Blueprint, jsonify, request

# from models.meeting import Meeting

# create_meeting_blueprint = Blueprint('create_meeting', __name__)


# @create_meeting_blueprint.route('/meeting',methods=["POST"])
# def meeting(user_id,
# name,
# event_type,
# description,
#  duration):
#     output = dict()
#     status = 422
#     new_event_data = json.loads(request.data.decode('utf-8'))
#     print(data)
#     if not data:
#         return jsonify({"error": "Missing updated data"}), status
#      try:
        
#         newValues = {"$set": data}
#         result = Meeting.save(newValues)
#         if result:
#             output["success"] = f"meeting saved successfully"
#             status = 200
#         else:
#             output["error"] = "Error occurred while saving meeting"
#         return jsonify(output), status
#     except Exception as e:
#         output['error'] = f'{e}'
#         status = 500
#         return jsonify(output), status


#     try:
#         user_id = request.json['user_id']
#         new_meeting = {"$set":{"user_id": "5f69713107ad65349c8ad946","name":"name","event_type": "event","description":"description","duration":45}}

#   # user_id,
#         #  name,
#         #  event_type,
#         #  description,
#         #  duration
#      new_meeting.save()
#         output['meeting'] = {'user': new_meeting['user_id'], 'duration': new_meeting['duration']}
#         status = 200
#     except ValueError as e:
#         output['error'] = f'{event_type}'
#         status = 400
#     return jsonify(output), status


from flask import Blueprint, app, jsonify, request
from bson import ObjectId
from models.meeting import Meeting
import config
import json
from models.base import BaseModel


create_meeting_blueprint = Blueprint('create_meeting', __name__)


@create_meeting_blueprint.route('/meeting', methods=["POST"])
def add_meeting(
    # user_id,
    # name,
    # event_type,
    # description,
    # duration
    ):
    """
    Update a user object in database.
    This function expects user id as url parameter.
    This fucntion aslo expects new values for user object 
    in the request body. So request should use POST method and 
    It should have body.
    """
    output = dict()
    status = 422
    # data = json.loads(request.data)
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    # if not user_id:
    #     return jsonify({"error": "Missing user id"}), status
    if not data:
        return jsonify({"error": "Missing data to save"}), status
    try:
      
        #  newValues = {"$set": data}
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
            output["error"] = "Error occurred while updating"
        return jsonify(output), status
    except Exception as e:
        output['error'] = f'{e}'
        status = 500
        return jsonify(output), status