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

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/barbers', methods=['GET', 'POST'])
def barbers():
    if request.method == 'GET':
        barber_list = [barber.to_dict(rules=('-appointments',)) for barber in Barber.query.all()]
        return make_response(barber_list, 200)

    elif request.method == 'POST':
        get_json = request.get_json()
        try:
            new_barber = Barber(
                name=get_json['name'],
                image=get_json['image'],
                phone=get_json['phone'],
                email=get_json['email']
            )
            db.session.add(new_barber)
            db.session.commit()
            return make_response(new_barber.to_dict(), 201)
        except:
            return make_response({'errors': 'validation errors'}, 400)

@app.route('/barbers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def barber_by_id(id):
    if request.method == 'GET':
        barber = Barber.query.filter(Barber.id == id).first()
        if barber:
            return make_response(barber.to_dict(rules=('-appointments',)), 200)
        else:
            return make_response({'error': 'Barber not found'}, 404)

    elif request.method == 'PATCH':
        barber = Barber.query.filter(Barber.id == id).first()
        try:
            get_json = request.get_json()
            if barber:
                for attr in get_json:
                    setattr(barber, attr, get_json.get(attr))
                    db.session.add(barber)
                    db.session.commit()
                    return make_response(barber.to_dict(rules=('-appointments',)), 202)
            else:
                return make_response({'error': 'Barber not found'}, 404)
        except:
            return make_response({'errors': 'validation errors'}, 400)

    elif request.method == 'DELETE':
        barber = Barber.query.filter(Barber.id == id).first()
        if barber:
            db.session.delete(barber)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({'error': 'Barber not found'}, 404)
        

@app.route('/appointments', methods=['GET', 'POST'])
def appointments():
    if request.method == 'GET':
        appointment_list = [appointment.to_dict(rules=('-barber',)) for appointment in Appointment.query.all()]
        return make_response(appointment_list, 200)

    elif request.method == 'POST':
        get_json = request.get_json()
        try:
            new_appointment = Appointment(
                time=get_json['time'],
                hc_notes=get_json['hc_notes'],
                barber_id=get_json['barber_id']
            )
            db.session.add(new_appointment)
            db.session.commit()
            return make_response(new_appointment.to_dict(rules=('-barber',)), 201)
        except:
            return make_response({'errors': 'validation errors'}, 400)

        
@app.route('/appointments/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def appointment_by_id(id):
    if request.method == 'GET':
        appointment = Appointment.query.filter(Appointment.id == id).first()
        if appointment:
            return make_response(appointment.to_dict(rules=('-barber',)), 200)
        else:
            return make_response({'error': 'Appointment not found'}, 404)

    elif request.method == 'PATCH':
        appointment = Appointment.query.filter(Appointment.id == id).first()
        try:
            get_json = request.get_json()
            if appointment:
                for attr in get_json:
                    setattr(appointment, attr, get_json.get(attr))
                    db.session.add(appointment)
                    db.session.commit()
                    return make_response(appointment.to_dict(rules=('-barber',)), 202)
            else:
                return make_response({'error': 'Appointment not found'}, 404)
        except:
            return make_response({'errors': 'validation errors'}, 400)

    elif request.method == 'DELETE':
        appointment = Appointment.query.filter(Appointment.id == id).first()
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({'error': 'Appointment not found'}, 404)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

