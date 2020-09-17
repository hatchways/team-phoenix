import config


class BaseModel:

    """
        This will save the data contained in the inheriting classes 'data' dictionary
         into a MongoDB collection named after the class that we are saving.
    """
    def save(self):
        # Stored in the database
        db = config.get_db()
        class_type = self.__class__.__name__
        model_object = db[class_type]
        result = model_object.insert_one(self.data)
        if config.is_dev_environment():
            print(f'DEBUG: Saved meeting to DB {result.inserted_id}')
