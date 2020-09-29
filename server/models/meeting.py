import config
from models.base import BaseModel


class Meeting(BaseModel):

    def __init__(self, user_id, name, event_type, description, duration):
        # Meetings that are not in the list below will be rejected
        possible_meeting_lengths = [15, 30, 45]
        if duration not in possible_meeting_lengths:
            raise ValueError(f"Meeting lengths must be one of: {possible_meeting_lengths}")

        # Local variables
        self['user_id'] = user_id
        self['name'] = name
        self['type'] = event_type
        self['description'] = description
        self['duration'] = duration
        

        if config.is_dev_environment():
            print(f"DEBUG: Created meeting with {self['user_id']} for {self['duration']} minutes")
