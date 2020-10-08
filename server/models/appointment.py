from models.base import BaseModel


class Appointment(BaseModel):
    def __init__(self, appointmentObj):
        self["user_id"] = appointmentObj["user_id"]
        self["summary"] = appointmentObj.get("summary")
        self["description"] = appointmentObj.get("description")
        self["start"] = appointmentObj.get("start")
        self["end"] = appointmentObj.get("end")
        self["attendees"] = appointmentObj.get("attendees")
