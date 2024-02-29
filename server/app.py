from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Barber, Appointment
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Barbers(Resource):
    def get(self):
        barber_list = [barber.to_dict(rules = ('-appointments',)) for barber in Barber.query.all()]
        return make_response(barber_list, 200)
    
    def post(self):
        get_json = request.get_json()
        try:
            new_barber = Barber(
                name = get_json['name'],
                image = get_json['image'],
                phone = get_json['phone'],
                email = get_json['email']
            )
            db.session.add(new_barber)
            db.session.commit()
            return make_response(new_barber.to_dict(), 201)
        except:
            return make_response({
                'errors': 'validation errors'
            }, 400)

    
api.add_resource(Barbers, '/barbers')

class BarberByID(Resource):


    def get(self, id):
        barber = Barber.query.filter(Barber.id == id).first()
        return make_response(barber.to_dict(rules = ('-appointments',)), 200)
    
    def patch(self, id):

        pass

    def delete(self, id):
        barber = Barber.query.filter(Barber.id == id).first()
        if barber:
            db.session.delete(barber)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({
                "error": "Barber not found"
            }, 404)


    
api.add_resource(BarberByID, '/barbers/<int:id>')

class Appointments(Resource):
    def get(self):
        appointment_list = [appointment.to_dict(rules = ('-barber',)) for appointment in Appointment.query.all()]
        return make_response(appointment_list, 200)
    
    def post(self):
        get_json = request.get_json()
        try:
            new_appointment = Appointment(
                time = get_json['time'],
                hc_notes = get_json['hc_notes'],
                barber_id = get_json['barber_id']
            )
            db.session.add(new_appointment)
            db.session.commit()
            return make_response(new_appointment.to_dict(rules = ('-barber',)), 201)
        except:
            return make_response({
                'errors': 'validation errors'
            }, 400)
        
api.add_resource(Appointments, '/appointments')

class AppointmentByID(Resource):
    def get(self, id):
        appointment = Appointment.query.filter(Appointment.id == id).first()
        return make_response(appointment.to_dict(rules = ('-barber',)), 200)
    
    def patch(self, id):
        pass

    def delete(self, id):
        appointment = Appointment.query.filter(Appointment.id == id).first()
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({
                'error': 'appointment not found'
            }, 404)
        
api.add_resource(AppointmentByID, '/appointments/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

