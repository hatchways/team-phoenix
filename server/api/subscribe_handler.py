from flask import Blueprint, app, jsonify, url_for
import stripe
import config
from os import environ
subscribe_blueprint = Blueprint('subscribe_blueprint', __name__)


@subscribe_blueprint.route('/subscribe/<plan_type>', methods=["POST", "GET"])
def meetings(plan_type):
    output = dict()
    status = 200
    stripe.api_key = environ['STRIPE_SECRET_KEY']
    product_id = "price_1HXnhHINJI1J85ZA22Gc0lsm"
    try:
        if plan_type == "premium":
            product_id = "price_1HXnhHINJI1J85ZA22Gc0lsm"
        else:
            product_id = "price_1HXnjPINJI1J85ZAObYO7iga"
        session = stripe.checkout.Session.create(
            payment_method_types=['card'], line_items=[{'price': product_id, 'quantity': 1, }],
            mode='subscription',
            success_url="http://localhost:3000/" +
            '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url="http://localhost:3000/upgrade"
        )
        return {
            'checkout_session_id': session['id'],
            'checkout_public_key': environ['STRIPE_PUBLIC_KEY']}

    except Exception as e:
        output['error'] = f'{e}'
    return jsonify(output), status
