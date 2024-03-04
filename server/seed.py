#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Barber, Appointment, Customer, Haircut

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Seeding barber...")
        barbers = [
            Barber(name="Tyler",
                   image="https://upload.wikimedia.org/wikipedia/commons/3/35/Basic_human_drawing.png",
                   phone="123-456-7890",
                   email="notanemail@gmail.com")
        ]
        
        db.session.add_all(barbers)

        print("Seeding appointments...")
        appointments = [
            Appointment(time = '2:15',
                        hc_notes = 'Make me look like a pineapple.',
                        barber_id = 1,
                        customer_id = 1,
                        haircut_id = 1
                        )
        ]

        db.session.add_all(appointments)

        print("Seeding haircuts...")
        haircuts = [
            Haircut(name = fake.name(),
                    price = randint(10, 100))
        ]
        db.session.add_all(haircuts)
        print("Seeding customers...")
        customers = [
            Customer(name = fake.name(),
                    preferred_haircut = fake.name(),
                    phone_number = "123-456-7890",
                    email = fake.email())
        ]
        db.session.add_all(customers)
        print('Done seeding!..')

        db.session.commit()

        
        # Seed code goes here!


