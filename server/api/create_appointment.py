from flask import Blueprint
create_appointment = Blueprint('create_appointment', __name__)


#CREATE /appointment -> Create an appointment (meeting_id, name, email, time (datetime), timezone)
@create_appointment.route('/appointment')
def appointment():
    # add appointment to database

    # create Appointment Model -> __init__(self, meeting_id, name, email, time (datetime), timezone)
    # Model created will add appointment to database
    
    ## appointment = Appointment(meeting_id, name, email, time (datetime), timezone)

    return 'Create appointment'



