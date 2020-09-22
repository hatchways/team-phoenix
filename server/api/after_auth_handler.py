from flask import jsonify, Blueprint, redirect, url_for, session, request, make_response
from models.user import User
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import jwt
import json


def create_jwt_token(user_id, user_name, app_secret):
    return jwt.encode({"user_id": str(user_id), 'username': user_name, "role": "regular_user"}, app_secret, algorithm='HS256').decode('utf-8')


def create_after_Auth_blueprint(gauth, google, app_secret):
    """
    This function handles the process after authentication.
    It gets the user info after authentication and create new
    user if user does not exist in DB.
    """

    after_auth_handler = Blueprint("after_auth_handler", __name__)

    @after_auth_handler.route('/authorize')
    def authorize():
        SCOPES = ["https://www.googleapis.com/auth/calendar",
                  "https://www.googleapis.com/auth/userinfo.profile"]
        state = session['state']
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            "/Users/simerpreetsinghjassal/Desktop/team-phoenix/server/api/client_secret.json", scopes=None, state=state)
        flow.redirect_uri = url_for(
            'after_auth_handler.authorize', _external=True)

        authorization_response = request.url
        flow.fetch_token(authorization_response=authorization_response)
        credentials = flow.credentials
        session['credentials'] = credentials
        # session['credentials'] = {
        #     "authorize": credentials,
        #     'token': credentials.token,
        #     'refresh_token': credentials.refresh_token,
        #     'token_uri': credentials.token_uri,
        #     'client_id': credentials.client_id,
        #     'client_secret': credentials.client_secret,
        #     'scopes': credentials.scopes
        # }
        return redirect("https://localhost:3000/after-login")
    return after_auth_handler
