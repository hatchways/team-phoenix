import os
from flask import Flask


from config import basic_auth_configSetup
from flask_cors import CORS

from api.auth_handler import create_auth_blueprint
from api.after_auth_handler import create_after_Auth_blueprint
from api.get_meetings import get_meetings_blueprint
from api.create_meeting import create_meeting_blueprint

app = Flask(__name__)
app_secret = os.environ['APP_SECRET']
app.secret_key = app_secret
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'

CORS(app, resources={
    r"/*": {"origins": "*"}})

gauth, google = basic_auth_configSetup(app)

app.register_blueprint(create_after_Auth_blueprint(gauth, google, app_secret))
app.register_blueprint(create_auth_blueprint(gauth, google))
app.register_blueprint(create_meeting_blueprint)
app.register_blueprint(get_meetings_blueprint)
