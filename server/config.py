import os
from dotenv import load_dotenv
from authlib.integrations.flask_client import OAuth
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

load_dotenv()
TEAM_NAME = os.environ['TEAM_NAME']


def basic_auth_configSetup(app):
    oauth = OAuth(app)
    google = oauth.register(
        name='google',
        client_id=os.environ["GOOGLE_CLIENT_ID"],
        client_secret=os.environ["GOOGLE_SECRET"],
        access_token_url='https://accounts.google.com/o/oauth2/token',
        access_token_params=None,
        authorize_url='https://accounts.google.com/o/oauth2/auth',
        authorize_params=None,
        api_base_url='https://www.googleapis.com/oauth2/v1/',
        userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        client_kwargs={'scope': 'openid email profile'},
    )
    return oauth, google


TEAM_NAME = os.environ['TEAM_NAME']
TEAM_LEAD = os.environ['TEAM_LEAD']
TEAM_NAMES = os.environ['TEAM_NAMES']

FLASK_ENV = os.environ['FLASK_ENV']

MONGO_DB = os.environ['MONGO_DB']
DB_NAME = os.environ['DATABASE_NAME']

# Make a connection to the database
if os.environ['MONGO_DB'] == "":
    # If you have MongoDB running locally, this will connect to it
    client = MongoClient()
else:
    # Otherwise, connect to the MONGO_DB from the .env file
    client = MongoClient(os.environ['MONGO_DB'])


# Call this from wherever you need a connection to the MongoDB
# Example:
#   import config
#   db = config.get_db()
def get_db():
    try:
        # Check the connection was successful
        client.admin.command('ismaster')
        return client[DB_NAME]
    except ConnectionFailure as e:
        print(f"Server not available: {e}")
        raise ConnectionFailure(
            f"Was unable to connect to the database: {MONGO_DB}")


def is_dev_environment():
    if FLASK_ENV == "development":
        return True
    return False
