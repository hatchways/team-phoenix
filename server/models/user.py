from time import gmtime, strftime
from models.base import BaseModel
from models.availability import Availability
from pymongo.errors import OperationFailure
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
        collection = config.get_db()["users"]
        try:
            return collection.find_one({"email": email})
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            return None

    @classmethod
    def save(self, collection_name=None, query=None, newValues=None):
        print("\n\n SIMER SIMER")
        print(query,newValues)
        if not (query and newValues):
            user_exist = self.user_exist()
            if not user_exist:
                return super().save(collection_name)
            else:
                return user_exist
        else:
            return super().save(collection_name, query, newValues)

    @classmethod
    def find_url(self, url):
        collection = config.get_db()["users"]
        try:
            result = collection.find_one({"unique_url": url})
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            result = None
        return result
