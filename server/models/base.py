import config


class BaseModel:

    """
        This will save the data contained in the inheriting classes 'data' dictionary
         into a MongoDB collection called 'modelObjects'.

        Different types of data can be told apart from storing a 'type' inside the
         dictionary.

         Example:
             data['type'] = 'Meeting'
    """
    def save(self):
        # Stored in the database
        db = config.get_db()
        model_object = db.modelObjects
        result = model_object.insert_one(self.data)
        if config.is_dev_environment():
            print(f'DEBUG: Saved meeting to DB {result.inserted_id}')
