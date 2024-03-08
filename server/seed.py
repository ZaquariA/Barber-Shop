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
        barber_data = [
            {
                "name": "Tyler",
                "image": "https://upload.wikimedia.org/wikipedia/commons/3/35/Basic_human_drawing.png",
                "phone": "123-456-7890",
                "email": "notanemail@gmail.com"
            },
            {
                "name": "John",
                "image": "https://example.com/john.png",
                "phone": "987-654-3210",
                "email": "john@example.com"
            },
            # Add more barber data as needed
        ]
        
        barbers = [Barber(name=data["name"], image=data["image"], phone=data["phone"], email=data["email"]) for data in barber_data]
        
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

        haircuts_data = [
            {
                "name": "New York Slice",
                "price": 50,
                "image": "https://cdn.discordapp.com/attachments/1212789264509566986/1215414515089416193/image.png?ex=65fca9f9&is=65ea34f9&hm=6efadd9406bef04cf295c641c062f47b9b40f4a8014fb8ff82e30ebae0487ccf&"
            },
            {
                "name": "A Little Off the Top",
                "price": 20,
                "image": "https://cdn.discordapp.com/attachments/1212789264509566986/1215414514753863690/wp-16001989765553425548261923989282.png?ex=65fca9f9&is=65ea34f9&hm=5b630c18850aa39bb44f736aa58615983638bcb2ffbf74056b6f66a1e29d383e&"
            },
            {
                "name": "Checkers",
                "price": 100,
                "image": "https://cdn.discordapp.com/attachments/1212789264509566986/1215414514434969610/image.png?ex=65fca9f9&is=65ea34f9&hm=0490e9d5671b3beee33b83ad606dd7a2fd9568436bae8d851bb4ed5db116662c&"
            },
        ]

        haircuts = []
        for data in haircuts_data:
            haircut = Haircut(name=data["name"], price=data["price"], image=data["image"])
            haircuts.append(haircut)

        db.session.add_all(haircuts)
        print("Seeding customers...")
        customers = [
            Customer(name = fake.name(),
                    phone = "123-456-7890",
                    email = fake.email())
        ]
        db.session.add_all(customers)
        print('Done seeding!..')

        db.session.commit()

        
        # Seed code goes here!


