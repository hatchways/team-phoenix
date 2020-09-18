import config
from models.base import BaseModel


class Meeting(BaseModel):

    def __init__(self, user_id, duration):
        # Meetings that are not in the list below will be rejected
        possible_meeting_lengths = [15, 30, 45]
        if duration not in possible_meeting_lengths:
            raise ValueError(f"Meeting lengths must be one of: {possible_meeting_lengths}")

        # Local variables
        self.user_id = user_id
        self.duration = duration
        self.data = dict()
        self.data['user_id'] = user_id
        self.data['duration'] = duration

        if config.is_dev_environment():
            print(f'DEBUG: Created meeting with {user_id} for {duration} minutes')
            print(f'DEBUG: Created meeting for user: {self.data["user_id"]}, length: {self.data["duration"]} minutes')

    def save(self):
        # TODO: This is temporary until base object class is sorted out
        # Stored in the database
        db = config.get_db()
        meetings = db.Meetings
        meeting_data = {
            'user_id': self.user_id,
            'duration': self.duration
        }

        result = meetings.insert_one(meeting_data)
        if config.is_dev_environment():
            print(f'DEBUG: Added meeting {result.inserted_id}')

    @staticmethod
    # TODO: Get the meetings, this is a placeholder.
    #  It will probably inherit from BaseModel
    def load(user_id):
        db = config.get_db()
        # TODO: Below line will be based on the class
        meetings = db.Meetings
        result = meetings.find({'user_id': user_id})
        return result
