import config
from models.base import BaseModel


class Meeting(BaseModel):

    def __init__(self, user_id, duration):
        # Meetings that are not in the list below will be rejected
        possible_meeting_lengths = [15, 30, 45]
        if duration not in possible_meeting_lengths:
            raise ValueError(f"Meeting lengths must be one of: {possible_meeting_lengths}")

        # Local variables
        self.data = dict()
        self.data['user_id'] = user_id
        self.data['duration'] = duration

        if config.is_dev_environment():
            print(f'DEBUG: Created meeting for user: {self.data["user_id"]}, length: {self.data["duration"]} minutes')