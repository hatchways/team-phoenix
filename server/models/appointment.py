from models.base import BaseModel


class Appointment(BaseModel):
    def __init__(self, appointmentObj):
        self["meeting_id"] = appointmentObj.get("meeting_id")
        self["name"] = appointmentObj.get("name")
        self["email"] = appointmentObj.get("email")
        self["time"] = appointmentObj.get("time")
        self["timezone"] = appointmentObj.get("timezone")
