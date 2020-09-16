import os
from dotenv import load_dotenv
from authlib.integrations.flask_client import OAuth
load_dotenv()
TEAM_NAME = os.environ['TEAM_NAME']


def basic_auth_configSetup(app):
    oauth = OAuth(app)
    google = oauth.register(
        name='google',
        client_id=os.environ["GOOGLE_CLIENT_ID"],
        client_secret=os.environ["GOOGLE_SCRET"],
        access_token_url='https://accounts.google.com/o/oauth2/token',
        access_token_params=None,
        authorize_url='https://accounts.google.com/o/oauth2/auth',
        authorize_params=None,
        api_base_url='https://www.googleapis.com/oauth2/v1/',
        userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        client_kwargs={'scope': 'openid email profile'},
    )
    return oauth, google
