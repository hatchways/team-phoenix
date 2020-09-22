import config
from bson.objectid import ObjectId
from pymongo.errors import OperationFailure
import json


class BaseModel(dict):
    """
        This will save the data contained in the inheriting classes 'data' dictionary
         into a MongoDB collection named after the class that we are saving.

        If no collection_name is provided, it is assumed the collection is named after
         the class (Meeting -> Meeting collection)
    """
    @classmethod
    def save(self, collection_name=None, query=None, newValues=None):
        if collection_name is None:
            collection_name = self.__class__.__name__
        try:
            collection = config.get_db()[collection_name]
            if not query:
                result = collection.insert_one(self)
            else:
                result = collection.update_one(query, newValues)
            if config.is_dev_environment():
                print(f'DEBUG: Saved obj to DB {result}')
            return result
        except OperationFailure as e:
            print(f"Database operation failed: {e}")
            return None

    def save_many(self, collection_name, *for_insertion):
        # TODO
        pass

    """
        This will load all entries that match the user_id for the given collection_name
    """
    @staticmethod
    def load_many_by_user(user_id, collection_name):
        db = config.get_db()[collection_name]
        result = db.find({'user_id': user_id})
        return result
