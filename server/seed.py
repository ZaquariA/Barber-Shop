#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Barber, Appointment

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
                        barber_id = 1)
        ]

        db.session.add_all(appointments)
        db.session.commit()

        print('Done seeding!..')
        # Seed code goes here!


