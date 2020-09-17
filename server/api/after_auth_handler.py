from flask import jsonify, Blueprint, redirect, url_for, session
from models import user


def create_after_Auth_blueprint(gauth, google):

    after_auth_handler = Blueprint("after_auth_handler", __name__)

    @after_auth_handler.route('/authorize')
    def authorize():
        google = gauth.create_client('google')
        token = google.authorize_access_token()
        resp = google.get('userinfo')
        user_info = resp.json()
        g_user = gauth.google.userinfo()
        user.User(g_user).save("users")
        session['profile'] = user_info
        session.permanent = True
        return redirect("http://localhost:3000/after-login/")
    return after_auth_handler
