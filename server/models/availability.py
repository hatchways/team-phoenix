from models.base import BaseModel

class Availability(BaseModel):
    def __init__(self, day, time_from, time_to):
        self["day"] = day
        self["time_from"] = time_from
        self["time_to"] = time_from
