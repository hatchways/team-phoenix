from models.user import User
from bson import ObjectId
import os
import requests
from threading import Timer

def update_toke_for_demo():
   
    # refresh_token = User.fetch_user("5faf4b42f34f61800537e19d").get("refresh_token")
    # params = {
    #         "grant_type": "refresh_token",
    #         "client_id": os.environ["GOOGLE_CLIENT_ID"],
    #         "client_secret":os.environ["GOOGLE_SECRET"],
    #         "refresh_token": refresh_token
    # }
    # authorization_url = "https://www.googleapis.com/oauth2/v4/token"

    # r = requests.post(authorization_url, data=params)
    # print(r.json())
    print("SSSSS")



r = Timer(1.0, update_toke_for_demo)
r.start()