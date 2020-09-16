from flask import Blueprint, render_template, redirect, url_for, request
from api.create_appointment import create_appointment 

get_appointments = Blueprint('get_appointments', __name__)

#get_appointments.register_blueprint(create_appointment)

#get /appointments -> list of appointments for logged in user
@get_appointments.route('/appointments', methods=["POST", "GET"])
def appointments():
    if request.method == "POST":
        # redirect to /appointment after time is specified
        return redirect(url_for('create_appointment.appointment'))

    else:
        # Get appointments from database
        # display list of appointments and get date and time selected
        return render_template("appointments.html")