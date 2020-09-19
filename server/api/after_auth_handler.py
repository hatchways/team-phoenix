from flask import jsonify, Blueprint, redirect, url_for, session, jsonify, Response
from models import user
import jwt


def create_jwt_token(user_id, user_name, app_secret):
    return jwt.encode({"user_id": str(user_id), 'username': user_name, "role": "regular_user"}, app_secret, algorithm='HS256').decode('utf-8')


def create_after_Auth_blueprint(gauth, google, app_secret):

    after_auth_handler = Blueprint("after_auth_handler", __name__)

    @ after_auth_handler.route('/authorize')
    def authorize():
        google = gauth.create_client('google')
        token = google.authorize_access_token()
        resp = google.get('userinfo')
        user_info = resp.json()
        g_user = gauth.google.userinfo()
        db_user = user.User(g_user).save("users")
        session['profile'] = user_info
        jwt_token = create_jwt_token(
            db_user.inserted_id, g_user.name, app_secret)
        session["token"] = jwt_token
        session.permanent = True
        headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Location': 'http://localhost:3000/after-login/',
        }
        resonse = Response('http://localhost:3000/after-login/',
                           status=302, headers=headers)
        resonse.set_cookie('token', jwt_token)
        return resonse
    return after_auth_handler
