from flask import Blueprint, app, jsonify, url_for, request, abort
from bson import ObjectId
from models.user import User
import stripe
import json
import requests
from os import environ
confirm_webhook_blueprint = Blueprint('confirm_webhook_blueprint', __name__)


@confirm_webhook_blueprint.route('/confirm_webhook', methods=["POST"])
def stripe_webhook():
    if request.content_length > 1024 * 1024:
        abort(400)
    payload = request.get_data()
    sig_header = request.environ.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = environ['STRIPE_ENDPOINT_SECRET']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Invalid payload
        print('INVALID PAYLOAD')
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print('INVALID SIGNATURE')
        return {}, 400

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        if session["payment_status"] == "paid":
            user_id = session["metadata"]["user_id"]
            data_to_update = {"subscription_id": session["subscription"],
                              "customer_id": session["customer"]}
            query = {"_id": ObjectId(user_id)}
            newValues = {"$set": data_to_update}
            User.update(query, newValues)

    return {}
