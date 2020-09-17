import config
import json
from abc import ABC, abstractmethod


class BaseModel(ABC):

    """
        This will save the data contained in the inheriting classes 'data' dictionary
         into a MongoDB collection named after the class that we are saving.
    """
   def save(self, collection_name):
        # Stored in the database
        db = config.get_db()
        collection = db[collection_name]
        result = collection.insert_one(self.get_dic())
        if config.is_dev_environment():
            print(f'DEBUG: Saved meeting to DB {result.inserted_id}')

    @abstractmethod
    def get_dic():
        pass
    
