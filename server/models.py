from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import re
from config import db

# Models go here!

class Barber(db.Model, SerializerMixin):
    __tablename__ = 'barbers'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String, nullable = True)
    image = db.Column(db.String, nullable = True)

    appointments = db.relationship('Appointment', back_populates = 'barber')

    serialize_rules = ('-appointments.barber',)

    @validates('name', 'phone', 'email')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty.')
        return name

    def validate_phone(self, key, phone):
        if not re.match(r'^\d{3}-\d{3}-\d{4}$', phone):
            raise ValueError("Invalid phone number format. Please enter a 10-digit number with hyphens (e.g., 123-456-7890).")
        return phone
    
    def validate_email(self, key, email):
        if not re.match(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', email):
            raise ValueError("Invalid email format")
        return email



    
class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    phone = db.Column(db.String)
    email = db.Column(db.String)

    appointments = db.relationship('Appointment', back_populates = 'customer')

    serialize_rules = ('-appointments.customer', )
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty.')
        return name

    @validates('phone')
    def validate_phone(self, key, phone):
        if not re.match(r'^\d{3}-\d{3}-\d{4}$', phone):
            raise ValueError("Please enter a 10-digit phone number with hyphens (e.g., 123-456-7890).")
        return phone
    
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', email):
            raise ValueError("Please enter a valid email address")
        return email
    
    def __repr__(self):
        return f'<Customer {self.id}>'
    
class Haircut(db.Model, SerializerMixin):
    __tablename__ = 'haircuts'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    price = db.Column(db.Integer)
    image = db.Column(db.String)

    appointments = db.relationship('Appointment', back_populates = 'haircut')

    serialize_rules = ('-appointments.haircut', )

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key = True)
    time = db.Column(db.String)
    hc_notes = db.Column(db.String)
    barber_id = db.Column(db.Integer, db.ForeignKey('barbers.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    haircut_id = db.Column(db.Integer, db.ForeignKey('haircuts.id'))

    barber = db.relationship('Barber', back_populates = 'appointments')
    customer = db.relationship('Customer', back_populates = 'appointments')
    haircut = db.relationship('Haircut', back_populates = 'appointments')

    serialize_rules = ('-barber.appointments',
                       '-customer.appointments',
                       '-haircut.appointments',
                       )


    @validates('time')
    def validate_time(self, key, time):
        if not re.match(r'^([1-9]|1[0-2]):[0-5][0-9]$', time):
            raise ValueError("Invalid time format. Please use the format 'H:MM' where H is between 1-12 and MM is between 00-59.")
        return time

    def __repr__(self):
        return f'<Haircut {self.name}>'