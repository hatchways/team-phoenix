from flask import jsonify, Blueprint, redirect, url_for


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
        google = gauth.create_client('google')
        redirect_uri = url_for('after_auth_handler.authorize', _external=True)
        return google.authorize_redirect(redirect_uri)
    return auth_handler
