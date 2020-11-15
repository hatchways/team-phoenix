from models.user import User
from bson import ObjectId
from apscheduler.schedulers.background import BackgroundScheduler
import os
import requests
import threading


sched = BackgroundScheduler()
sched.start()

def timeout(myfunc):
    return  sched.add_job(myfunc, 'interval', minutes=45)

def update_toke_for_demo():
    user = User.fetch_user("5faff71a546a252d5c0ccc30")
    refresh_token = user["refresh_token"]
    params = {
            "grant_type": "refresh_token",
            "client_id": os.environ["GOOGLE_CLIENT_ID"],
            "client_secret":os.environ["GOOGLE_SECRET"],
            "refresh_token": refresh_token
    }
    authorization_url = "https://www.googleapis.com/oauth2/v4/token"
    resp = requests.post(authorization_url, data=params)
    if resp.status_code==200:
        result = resp.json()
        new_acces_Token = result["access_token"]
        newValues = {"$set": {"access_token": new_acces_Token }}
        query = {"_id": ObjectId("5faff71a546a252d5c0ccc30")}
        result = User.update(query, newValues)
