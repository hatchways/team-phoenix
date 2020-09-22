from flask import Blueprint, app, jsonify, request

import config
from models.user import User

is_unique_url_blueprint = Blueprint('is_unique_url_blueprint', __name__)


@is_unique_url_blueprint.route('/user/<user_id>/is_unique', methods=["GET"])
def check_url_is_unique(user_id):
    """
    This function checks if given url in query string parameters
    is uniqe i.e given url is not used for any other user.

    """
    output = dict()
    status = 422
    given_url = request.args.get('url', default="", type=str)
    if given_url == "":
        output["error"] = "Missing Unique URL"
    else:
        try:
            unique_url = User.find_url(given_url)
            if unique_url:
                output["error"] = "Unavailable"
            else:
                output["success"] = "available"
                status = 200
        except Exception as e:
            output['error'] = f'{e}'
            status = 500
    return jsonify(output), status
