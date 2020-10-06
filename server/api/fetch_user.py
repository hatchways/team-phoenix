from models.appointment import Appointment
from flask import jsonify, Blueprint, request
from models.user import User
import json

fetch_user_blueprint = Blueprint('fetch_unique_url', __name__)


@fetch_user_blueprint.route('/fetch-user/<user_id>', methods=["GET"])
def fetch_unique_url(user_id):
    output = dict()
    status = 500
    try:
        if user_id:
            user = User.fetch_user(user_id)
            output["result"] = user
        else:
            status = 400
            output["result"] = "Missing Input"
    except Exception as e:
        output["error"] = f"{e}"
    return jsonify(output), status
