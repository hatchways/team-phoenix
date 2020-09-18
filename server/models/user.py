from time import gmtime, strftime
from models.base import BaseModel
from models.availability import Availability
import config
debug = True


class User(BaseModel):
    db = config.get_db()
    db_users = db.users

    def __init__(self, userObj):
        self["first_name"] = userObj.given_name
        self["last_name"] = userObj.given_name
        self["email"] = userObj.email
        self["time_zone"] = strftime("%z", gmtime())
        self["first_name"] = userObj.given_name
        self["availability"] = []
        self["unique_url"] = ""

    def add(self, id, val):
        self._dict[id] = val

# "availability": {f"{key}": value.get_dic() for (key, value) in enumerate(self.availability)},
#     def user_exist(self, email):
#         return self.db_users.find_one({"email": email})
