from time import gmtime, strftime
import config
debug = True


class User:
    db = config.get_db()
    db_users = db.users

    def __init__(self, userObj):
        self.first_name = userObj.given_name
        self.last_name = userObj.family_name
        self.email = userObj.email
        self.time_zone = strftime("%z", gmtime())
        self.availability = []
        self.unique_url = ""

        if not self.user_exist(self.email):
            user_dict = {
                "first_name": self.first_name,
                "last_name": self.last_name,
                "email": self.email,
                "time_zone": self.time_zone,
                "availability": self.availability,
                "unique_url": self.unique_url,
            }
            self.db_users.insert_one(user_dict)

    def user_exist(self, email):
        return self.db_users.find_one({"email": email})
