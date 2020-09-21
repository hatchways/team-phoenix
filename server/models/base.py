import config
from bson.objectid import ObjectId
from pymongo.errors import OperationFailure
import json


class BaseModel(dict):

    """
        This will save the data contained in the inheriting classes 'data' dictionary
         into a MongoDB collection named after the class that we are saving.
    """
    db = config.get_db()

    def save(self, collection_name):
        try:
            collection = self.db[collection_name]
            if not hasattr(self, "_id"):
                result = collection.insert_one(self)
            else:
                result = collection.update(
                    {"_id": ObjectId(self._id)}, self)
            if config.is_dev_environment():
                print(f'DEBUG: Saved obj to DB {result.inserted_id}')
            return result
        except OperationFailure as e:
            print(f"Database operation failed: {e}")

    def save_many(self, collection_name, *for_insertion):
        # TODO
        pass
    