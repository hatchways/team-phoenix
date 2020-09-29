from time import gmtime, strftime
from models.base import BaseModel
from models.availability import Availability
from pymongo.errors import OperationFailure
import config
debug = True


class User(BaseModel):
    collection = config.get_db()["users"]

    def __init__(self, userObj):
        self["first_name"] = userObj.given_name
        self["last_name"] = userObj.given_name
        self["email"] = userObj.email
        self["time_zone"] = strftime("%z", gmtime())
        self["first_name"] = userObj.given_name
        self["availability"] = dict()
        self["unique_url"] = ""

    def add(self, id, val):
        self._dict[id] = val

    def user_exist(self):
        email = self["email"]
        try:
            return self.collection.find_one({"email": email})
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            return None

    def save(self, collection_name):
        user_exist = self.user_exist()
        if not user_exist:
            return super().save(collection_name)
        else:
            return user_exist

    @classmethod
    def update(cls, query, new_values):
        result = {}
        try:
            result = cls.collection.update_one(query, new_values)
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            result = None
        return result

    @classmethod
    def find_url(cls, url):
        try:
            result = cls.collection.find_one({"unique_url": url})
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            result = None
        return result

    @classmethod
    def get_user_start_end_time(cls, email):
        try:
            result = cls.collection.find_one({"email": email})
            if result:
                return result["Availability"]["start_time"], result["Availability"]["end_time"]
            else:
                return None
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            return None
