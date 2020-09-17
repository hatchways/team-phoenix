from time import gmtime, strftime
from models.base import BaseModel
from models.availability import Availability
import config
import bson
debug = True


class User(BaseModel):
    db = config.get_db()
    db_users = db.users

    def __init__(self, userObj):
        self.first_name = userObj.given_name
        self.last_name = userObj.family_name
        self.email = userObj.email
        self.time_zone = strftime("%z", gmtime())
        self.availability = []
        self.unique_url = ""

    def get_dic(self):
        my_dic = {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "time_zone": self.time_zone,
            "availability": {f"{key}": value.get_dic() for (key, value) in enumerate(self.availability)},
            "unique_url": self.unique_url
        }
        return my_dic

    def user_exist(self, email):
        return self.db_users.find_one({"email": email})
