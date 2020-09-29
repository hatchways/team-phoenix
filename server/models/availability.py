from models.base import BaseModel


class Availability(BaseModel):
    def __init__(self, day, start_time, end_time):
        self["days"] = day
        self["start_time"] = start_time
        self["end_time"] = end_time
