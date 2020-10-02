from time import gmtime, strftime
from models.base import BaseModel
from models.availability import Availability
from models.meeting import Meeting
from bson.objectid import ObjectId
from pymongo.errors import OperationFailure
import config
debug = True


class User(BaseModel):
    collection = config.get_db()["users"]

    def __init__(self, userObj):
        self["_id"] = ObjectId()
        self["first_name"] = userObj.given_name
        self["last_name"] = userObj.given_name
        self["email"] = userObj.email
        self["time_zone"] = strftime("%z", gmtime())
        self["first_name"] = userObj.given_name
        self["Availability"] = dict()
        self["unique_url"] = ""
        self["Meeting"] = Meeting(
            self["_id"], "First meeting", "one-to-one", "my meeting", 60)

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
