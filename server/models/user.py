from time import gmtime, strftime
import config
debug = True


class User:
    def __init__(self, userObj):
        self.first_name = userObj.given_name
        self.last_name = userObj.family_name
        self.email = userObj.email
        self.time_zone = strftime("%z", gmtime())
        self.availability = []
        self.unique_url = ""

        # Stored in the database
        db = config.get_db()
        db_users = db.users
        user_dict = {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "time_zone": self.time_zone,
            "availability": self.availability,
            "unique_url": self.unique_url,
        }
        db_users.insert_one(user_dict)
