from flask import Flask
from models.base import BaseModel


class Appointment(BaseModel):
    def __init__(self, meeting_id, name,email,datetime,timezone):
        self["meeting_id"] = meeting_id
        self["name"] = name
        self["email"] = email
        self["datetime"] = datetime
        self["timezone"] = timezone



