import config
from bson.objectid import ObjectId
import json


class BaseModel(dict):

    """
        This will save the data contained in the inheriting classes 'data' dictionary
         into a MongoDB collection named after the class that we are saving.
    """
    db = config.get_db()

    def save(self, collection_name):
        collection = self.db[collection_name]
        if not hasattr(self, "_id"):
            result = collection.insert_one(self)
        else:
            result = collection.update(
                {"_id": ObjectId(self._id)}, self)
        if config.is_dev_environment():
            print(f'DEBUG: Saved meeting to DB {result.inserted_id}')
        return result

    def save_multi(self, collection_name, *for_insertion):
        ret_result = []
        collection = self.db[collection_name]
        for obj in for_insertion:
            result = obj.save(collection_name)
            if result.inserted_id:
                ret_result[True]
            else:
                ret_result[False]
        return ret_result
