from flask import jsonify, Blueprint, redirect, url_for, session, jsonify, request, make_response
from models import user
import jwt
import json


def create_jwt_token(user_id, user_name, app_secret):
    return jwt.encode({"user_id": str(user_id), 'username': user_name, "role": "regular_user"}, app_secret, algorithm='HS256').decode('utf-8')


def create_after_Auth_blueprint(gauth, google, app_secret):

    after_auth_handler = Blueprint("after_auth_handler", __name__)

    @after_auth_handler.route('/authorize')
    def authorize():
        google = gauth.create_client('google')
        token = google.authorize_access_token()
        resp = google.get('userinfo')
        user_info = resp.json()
        g_user = gauth.google.userinfo()
        db_user = user.User(g_user).save("users")
        session['profile'] = user_info
        if type(db_user) is dict:
            user_id = db_user["_id"]
        else:
            user_id = db_user.inserted_id
        jwt_token = create_jwt_token(
            user_id, g_user.name, app_secret)
        session["token"] = jwt_token
        session.permanent = True
        resonse = make_response(
            redirect("http://localhost:3000/after-login?token=" +
                     jwt_token+"&user_id="+str(user_id)))
        resonse.set_cookie("token", jwt_token)
        resonse.set_cookie("user_id", str(user_id))
        return resonse
    return after_auth_handler
