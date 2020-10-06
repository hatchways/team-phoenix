from models.appointment import Appointment
from flask import jsonify, Blueprint, request
from models.user import User
import json

fetch_user_by_url_blueprint = Blueprint('fetch_by_url', __name__)


@fetch_user_by_url_blueprint.route('/fetch-user-by-url', methods=["GET"])
def fetch_user_by_url():
    output = dict()
    status = 500
    unique_url = request.args.get('unique_url', default="", type=str)
    try:
        if unique_url:
            user = User.fetch_user_by_url(unique_url)
            output["result"] = user
            status = 200
        else:
            status = 400
            output["result"] = "Missing Input"
    except Exception as e:
        output["error"] = f"{e}"
    return jsonify(output), status
