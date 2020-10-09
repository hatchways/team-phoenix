from flask import Blueprint, jsonify, url_for
from bson import ObjectId
from models.user import User
import stripe
from os import environ
cancel_subscription_blueprint = Blueprint('cancel_subscription', __name__)


@cancel_subscription_blueprint.route('/cancel-subscription/<subscribe_id>/<user_id>', methods=["GET"])
def cancel_subscription(subscribe_id, user_id):
    output = dict()
    status = 200
    stripe.api_key = environ['STRIPE_SECRET_KEY']
    try:
        response = stripe.Subscription.delete(subscribe_id)
        result = response.get("status", None)
        if result == "canceled":
            query = {"_id": ObjectId(user_id)}
            newValues = {"$set": {"subscription_id": ""}}
            User.update(query, newValues)
        output["result"] = response.get("status", None)
    except Exception as e:
        output['error'] = f'{e}'
        status = 500
    return jsonify(output), status
