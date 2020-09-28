from flask import jsonify, Blueprint, redirect, url_for, session, request, make_response
from models.user import User
import json


def create_after_Auth_blueprint(gauth, google, app_secret):
    """
    This function handles the process after authentication.
    It gets the user info after authentication and create new
    user if user does not exist in DB.
    """

    after_auth_handler = Blueprint("after_auth_handler", __name__)

    @after_auth_handler.route('/authorize')
    def authorize():
        error = request.args.get('error', default="", type=str)
        if error != "":
            return make_response(redirect(f"http://localhost:3000/after-login?error={error}!"))
        google = gauth.create_client('google')
        token = google.authorize_access_token()
        resp = google.get('userinfo')
        user_info = resp.json()
        g_user = gauth.google.userinfo()
        session["access_token"] = token["access_token"]
        """
        If user exists in DB then db_user will be dict.
        But if we are saving brand new user object
        Then db_user would be object containing
        property inserted_id
        """
        db_user = User(g_user).save("users")
        session['profile'] = user_info
        # User exists so db_user is dict
        if type(db_user) is dict:
            user_id = db_user["_id"]
            resonse = make_response(
                redirect("http://localhost:3000/dashboard?access_token=" +
                         token["access_token"]+"&user_id="+str(user_id)+"&email="+g_user.email+"&jwt_token="+token["id_token"]))
        else:
            user_id = db_user.inserted_id
            resonse = make_response(
                redirect("http://localhost:3000/profile_settings?access_token=" +
                         token["access_token"]+"&user_id="+str(user_id)+"&email="+g_user.email+"&jwt_token="+token["id_token"]))
        session.permanent = True
        return resonse
    return after_auth_handler
