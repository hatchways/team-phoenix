from flask import Blueprint, app, jsonify, request
from bson import ObjectId
from models.user import User
from google.oauth2 import id_token
from google.auth.transport import requests
import config
import json
import os

update_with_user_id_blueprint = Blueprint(
    'update_with_user_id_blueprint', __name__)


@update_with_user_id_blueprint.route('/user/<user_id>', methods=["POST"])
def update_user(user_id):
    """
    Update a user object in database.
    This function expects user id as url parameter.
    This fucntion aslo expects new values for user object 
    in the request body. So request should use POST method and 
    It should have body.
    """
    output = dict()
    status = 422
    data = json.loads(request.data.decode('utf-8'))
    data_to_update = data["data"]
    token = data["token"]
    try:
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), os.environ["GOOGLE_CLIENT_ID"])
        if not user_id:
            return jsonify({"error": "Missing user id"}), status
        if not data:
            return jsonify({"error": "Missing updated data"}), status
        try:
            query = {"_id": ObjectId(user_id)}
            newValues = {"$set": data_to_update}
            result = User.update(query, newValues)
            if result:
                output["success"] = f"User with id {user_id} update successfully"
                status = 200
            else:
                output["error"] = "Error occurred while updating"
            return jsonify(output), status
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
            return jsonify(output), status

    except ValueError as e:
        output['error'] = f'{e}'
        status = 401
        return jsonify(output), status
