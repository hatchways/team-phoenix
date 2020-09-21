from time import gmtime, strftime
from models.base import BaseModel
from models.availability import Availability
import config
debug = True


class User(BaseModel):

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

    def user_exist(self):
        email = self["email"]
        collection = self.db["users"]
        return collection.find_one({"email": email})

    def save(self, collection_name):
        print(self.user_exist(), "\n\n simer")
        user_exist = self.user_exist()
        if not user_exist:
            return super().save(collection_name)
        else:
            return user_exist
