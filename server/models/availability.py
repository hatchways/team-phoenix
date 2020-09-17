import bson
from models.base import BaseModel


class Availability():
    def __init__(self, day, time_from, time_to):
        self.day = day
        self.time_from = time_from
        self.time_to = time_to

    def get_dic(self):
        return {"day": self.day, "time_from": self.time_from, "time_to": self.time_to}
