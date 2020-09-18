from flask import Flask
from api.auth_handler import create_auth_blueprint
from api.after_auth_handler import create_after_Auth_blueprint
from flask_cors import CORS
from config import basic_auth_configSetup
import os

app = Flask(__name__)
app_secret = os.environ['APP_SECRET']
app.secret_key = app_secret
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'

CORS(app, resources={
     r"/*": {"origins": "*"}})

gauth, google = basic_auth_configSetup(app)

app.register_blueprint(create_after_Auth_blueprint(gauth, google, app_secret))
app.register_blueprint(create_auth_blueprint(gauth, google))
