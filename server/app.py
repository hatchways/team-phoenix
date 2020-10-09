import os
from flask import Flask


from config import basic_auth_configSetup
from flask_cors import CORS

from api.auth_handler import create_auth_blueprint
from api.after_auth_handler import create_after_Auth_blueprint
from api.get_meetings import get_meetings_blueprint
from api.create_meeting import create_meeting_blueprint
from api.check_unique_url import is_unique_url_blueprint
from api.update_with_user_id import update_with_user_id_blueprint
from api.availability_by_day import availability_by_day_blueprint
from api.subscribe_handler import subscribe_blueprint
from api.stripe_confirm_webhook import confirm_webhook_blueprint
from api.create_appointment import create_appointment_blueprint
from api.fetch_user import fetch_user_blueprint
from api.fetch_user_by_url import fetch_user_by_url_blueprint
from api.cancel_subscription import cancel_subscription_blueprint
app = Flask(__name__)
app_secret = os.environ['APP_SECRET']
app.secret_key = app_secret
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
app.config['STRIPE_PUBLIC_KEY'] = os.environ['STRIPE_PUBLIC_KEY']
app.config['STRIPE_SECRET_KEY'] = os.environ['STRIPE_SECRET_KEY']

CORS(app, resources={
    r"/*": {"origins": "*"}})

gauth, google = basic_auth_configSetup(app)

app.register_blueprint(create_after_Auth_blueprint(gauth, google, app_secret))
app.register_blueprint(create_auth_blueprint(gauth, google))
app.register_blueprint(create_meeting_blueprint)
app.register_blueprint(get_meetings_blueprint)
app.register_blueprint(is_unique_url_blueprint)
app.register_blueprint(update_with_user_id_blueprint)
app.register_blueprint(availability_by_day_blueprint)
app.register_blueprint(create_appointment_blueprint)
app.register_blueprint(subscribe_blueprint)
app.register_blueprint(confirm_webhook_blueprint)
app.register_blueprint(fetch_user_blueprint)
app.register_blueprint(fetch_user_by_url_blueprint)
app.register_blueprint(cancel_subscription_blueprint)
