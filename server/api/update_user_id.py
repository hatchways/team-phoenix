from flask import Blueprint, app, jsonify, request
from bson import ObjectId
import config
from models.user import User

update_user_id_blueprint = Blueprint('update_user_id_blueprint', __name__)


@update_user_id_blueprint.route('/user/<user_id>', methods=["POST"])
def update_user(user_id):
    """
    Update a user object in database.
    This function expects user id as url parameter.
    This fucntion aslo expects new values for user object 
    in the request body. So request should use POST method and 
    It should have body.
    """
    output = dict()
    status = 400
    data = request.json
    if not user_id:
        output["error"] = "Missing user id"
    if not data:
        output["error"] = "Missing updated data"
    else:
        try:
            query = {"_id": ObjectId(user_id)}
            newValues = {"$set": data}
            result = User.update(query, newValues)
            if result:
                output["success"] = f"User with id {user_id} update suceesfully"
            else:
                output["error"] = "Error occurred while updaing"
        except Exception as e:
            output['error'] = f'{e}'
            status = 400
    return jsonify(output), status
