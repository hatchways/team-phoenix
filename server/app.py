from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.auth_handler import create_auth_blueprint
from api.after_auth_handler import create_after_Auth_blueprint
from flask_cors import CORS
from config import basic_auth_configSetup
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'

CORS(app, resources={
     r"/*": {"origins": "*"}})

gauth, google = basic_auth_configSetup(app)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(create_after_Auth_blueprint(gauth, google))
app.register_blueprint(create_auth_blueprint(gauth, google))
