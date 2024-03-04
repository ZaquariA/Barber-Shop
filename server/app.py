from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Barber, Appointment, Customer, Haircut
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
        barber = Barber.query.filter(Barber.id == id).first()
        try:
            get_json = request.get_json()
            if barber:
                for attr in get_json:
                    setattr(barber, attr, get_json.get(attr))
                    db.session.add(barber)
                    db.session.commit()
                    return make_response(barber.to_dict(rules = ('-appointments',)), 202)
            else:
                return  make_response({
                    "error": "appointment not found"
                }, 404)
        except:
            return make_response({
                "errors": "validation errors"
            }, 400)

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
        appointment = Appointment.query.filter(Appointment.id == id).first()
        try:
            get_json = request.get_json()
            if appointment:
                for attr in get_json:
                    setattr(appointment, attr, get_json.get(attr))
                    db.session.add(appointment)
                    db.session.commit()
                    return make_response(appointment.to_dict(rules = ('-barber',)), 202)
            else:
                return  make_response({
                    "error": "appointment not found"
                }, 404)
        except:
            return make_response({
                "errors": "validation errors"
            }, 400)

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


@app.route('/customers', methods=['Get', 'POST'])
def customers():
    if request.method == 'GET':
        customers = Customer.query.all()
        customers_dict = [customers.to_dict(rules = ('-appointments', )) for customers in customers]
        response = make_response(
            customers_dict,
            200
        )
    elif request.method == 'POST':
        try:
            form_data = request.get_json()
            new_customer = Customer(
                name = form_data['name'],
                preferred_haircut = form_data['preferred_haircut'],
                phone_number = form_data['phone_number'],
                email = form_data['email']
            )
            db.session.add(new_customer)
            db.session.commit()
            response = make_response(
                new_customer.to_dict(), 
                201
            )

        except ValueError:
            response = make_response({
                'errors': 'validation errors'}, 
                400
        )

    return response

@app.route('/customers/<int:customer_id>', methods=['GET', 'PATCH', 'DELETE'])
def customer_by_id(customer_id):
    customer = Customer.query.get(customer_id)

    if customer:
        if request.method == 'GET':
            response = make_response(
                customer.to_dict(),
                200
            )
        elif request.method == 'PATCH':
             try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(customer, attr, form_data.get(attr))
                    db.session.add(customer)
                    db.session.commit()
                    response = make_response(
                        customer.to_dict(),
                        202
                    )

             except ValueError:
                response = make_response({
                    'errors': 'validation errors'}, 
                    400
                )
        elif request.method == 'DELETE':
            assoc_appointment = Appointment.query.filter(Appointment.customer_id == customer_id).all()
            for appointment in assoc_appointment:
                db.session.delete(appointment)
            db.session.delete(customer)
            db.session.commit()
            response = make_response(
                {}, 
                204
        )
                   
    else:
        response = make_response(
            {"error": "Customer not found"},
            404
        )
    

    return response

@app.route('/haircuts', methods = ['GET', 'POST'])
def haircuts():
    if request.method == 'GET':
        haircuts = Haircut.query.all()
        haircuts_dict = [haircut.to_dict() for haircut in haircuts]
        response = make_response(
            haircuts_dict, 
            200
        )
    elif request.method == 'POST':
        try:
            form_data = request.get_json()
            new_haircut = Haircut(
                name = form_data['name'],
                price = form_data['price']
            )
            db.session.add(new_haircut)
            db.session.commit()
            response = make_response(
                new_haircut.to_dict(), 
                201
            )

        except ValueError:
            response = make_response({
                'errors': 'validation errors'}, 
                400
        )
    else:
        response = make_response(
            {"error": "Haircut not found"},
            404
        )

    return response

@app.route('/haircuts/<int:haircut_id>', methods=['GET', 'PATCH', 'DELETE'])
def haircut_id(haircut_id):
    if request.method == 'GET':
        haircut = Haircut.query.get(haircut_id)
        if haircut:
            return make_response(haircut.to_dict(rules = ("-appointments", ) ), 200)
        else:
            return make_response({"error": "Haircut not found"}, 404)
    
    elif request.method == 'PATCH':
        try:
            form_data = request.get_json()
            haircut = Haircut.query.get(haircut_id)
            if haircut:
                for attr in form_data:
                    setattr(haircut, attr, form_data[attr])
                db.session.add(haircut)
                db.session.commit()
                return make_response(haircut.to_dict(rules = ("-appointments", ) ), 202)
            else:
                return make_response({"error": "Haircut not found"}, 404)
        except ValueError:
            return make_response({"errors": "validation errors"}, 400)
    
    elif request.method == 'DELETE':
        haircut = Haircut.query.get(haircut_id)
        if haircut:
            db.session.delete(haircut)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "Haircut not found"}, 404)


if __name__ == '__main__':
    app.run(port=5555, debug=True)

