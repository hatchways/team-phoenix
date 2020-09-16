from server import config


class Meeting:

    def __init__(self, user_id, duration):
        # Meetings that are not in the list below will be rejected
        possible_meeting_lengths = [15, 30, 45]
        if duration not in possible_meeting_lengths:
            raise ValueError(f"Meeting lengths must be one of: {possible_meeting_lengths}")

        # Local variables
        self.user_id = user_id
        self.duration = duration

        # Stored in the database
        db = config.get_db()
        meetings = db.meetings
        meeting_data = {
            'user_id': self.user_id,
            'duration': self.duration
        }
        result = meetings.insert_one(meeting_data)

        if config.is_dev_environment():
            print(f'DEBUG: Added meeting {result.inserted_id}')
