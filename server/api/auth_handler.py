from flask import jsonify, Blueprint, redirect, url_for, session
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery


def create_auth_blueprint(gauth, google):
    auth_handler = Blueprint('auth_handler', __name__)

    @auth_handler.route('/sign-in-with-google')
    def signMeIn():
        """
        This function initialize oauth client (gogole)
        and create redirect url (url after authentication)
        then redirect the  browser to google server for
        authentication
        """
        SCOPES = ["https://www.googleapis.com/auth/calendar",
                  "https://www.googleapis.com/auth/userinfo.profile"]
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            "/Users/simerpreetsinghjassal/Desktop/team-phoenix/server/api/client_secret.json", scopes=SCOPES)
        flow.redirect_uri = url_for(
            'after_auth_handler.authorize', _external=True)
        authorization_url, state = flow.authorization_url(
            access_type='offline', include_granted_scopes='true')

        session['state'] = state

        return redirect(authorization_url)
    return auth_handler
