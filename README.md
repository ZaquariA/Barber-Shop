# The BarberShop App

## Contributors: Tyler && Zaquari

## Phase and Cohort: Flask Phase 4 050123 East

## Description: This app will allow users to set up an appointment from a selection of barbers while having the possibility of changing details of the appointment.

![DBDiagram](https://cdn.discordapp.com/attachments/1213238971774275654/1213238987754577991/image.png?ex=65f4bfdb&is=65e24adb&hm=68ac3195a4af526a1015cfd3fabc9aa65f40741ff9c277cbea001ac7bfed9758&)

# lol 123

## MVP

##CRUD

C. User will be able to create an appointment, an instance of a customer, and add a barber/haircut.

R. User will be able to search for haircuts, barbers, and read appointments.

U. Users will be able to change customer's details, barber's details, haircut's details, and appointments time.

D. Users will be able to remove appointments, customers, haircuts, and barbers.

In this repo:

- There is a Flask application with some features built out.
- There is a fully built React frontend application.

You can check your API by:

- Using Postman to make requests

- Running the React application in the browser and interacting with the API via
  the frontend

You can import `.postman_collection.json` into Postman by
pressing the `Import` button.

## Setup

To download the dependencies for the frontend and backend, run:

```console
pipenv install
pipenv shell
npm install --prefix client
```

You can run your Flask API on [`127.0.0.1:5555`](http://127.0.0.1:5555/) by
running:

```console
python server/app.py
```

You can run your React app on [`localhost:4000`](http://localhost:4000) by
running:

```sh
npm start --prefix client
```

## Models

The file `server/models.py` defines the model classes **without relationships**.
Use the following commands to create the initial database `app.db`:

```console
export FLASK_APP=server/app.py
flask db init
flask db upgrade head
```

## Many-to-many

- Customers has many barbers through appointments
- Barbers has many customers through appointments
- Appointments belong to barber, and a customer

## Validations

Add validations to the `Barbers` model:

Add validations to the `Customers` model:

Add validations to the `Haircuts` model:

Add validations to the `Appointments` model:

## Controllers

API routes RESTful conventions

```console
GET    /customers/
POST   /customers/
GET    /customers/:id
PATCH  /customers/:id
DELETE /customers/:id
```

```console
GET    /barbers/
POST   /barbers/
GET    /barbers/:id
PATCH  /barbers/:id
DELETE /barbers/:id
```

```console
GET    /appointments/
POST   /appointments/
GET    /appointments/:id
PATCH  /appointments/:id
DELETE /appointments/:id
```

```console
GET    /haircuts/
POST   /haircuts/
GET    /haircuts/:id
PATCH  /haircuts/:id
DELETE /haircuts/:id
```

## Serialize Rules

```console
-
-
-

FRONTEND (REACT) Which components will make requests to your API? What route will the competent send fetch requests too? (i.e: ArtistForm, send a POST requests to /artists)
```

```console
EXTRA!
Stretch goals:
-
-
-
```
