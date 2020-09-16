from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.create_appointment import create_appointment
from api.get_appointments import get_appointments

app = Flask(__name__)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(create_appointment)
app.register_blueprint(get_appointments)

app.run(port=5000)
