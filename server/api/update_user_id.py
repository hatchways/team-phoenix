from flask import Blueprint, app, jsonify, request
from bson import ObjectId
import config
from models.user import User

update_user_id_blueprint = Blueprint('update_user_id_blueprint', __name__)


@update_user_id_blueprint.route('/user/<user_id>', methods=["POST"])
def update_user(user_id):
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
            result = User.save("users", query, newValues)
            # if unique_url:
            #     output["error"] = "Unavailable"
            # else:
            #     output["success"] = "available"
            #     status = 200
        except Exception as e:
            output['error'] = f'{e}'
            status = 400
    return jsonify(output), status
