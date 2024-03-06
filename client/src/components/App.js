// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Barber from './Barber';
import Haircut from './Haircut';
import MainPage from "./MainPage";
import Customer from './Customer';
import CustomerForm from './CustomerForm';
import Appointment from './Appointment';
import AppointmentForm from './AppointmentForm';
import styles from "./react.css"

function App() {
    const [barbers, setBarbers] = useState([]);
    const [haircuts, setHaircuts] = useState([]);
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        fetch('/barbers')
         .then(res => res.json())
         .then(dataArr => setBarbers(dataArr));

        fetch('/haircuts')
         .then(res => res.json())
         .then(dataArr => setHaircuts(dataArr));

        fetch('/customers')
         .then(res => res.json())
         .then(dataArr => setCustomers(dataArr)); 
    }, []);


  return (
        <div className="app_div">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/haircuts" component={Haircut} />
                    <Route exact path="/barbers" component={Barber} />
                    <Route exact path="/customers" component={Customer} />
                    <Route exact path="/customerform" component={CustomerForm} />
                    <Route exact path="/appointments" component={Appointment} />
                    <Route exact path="/appointmentForm" component = {AppointmentForm}>
                        <AppointmentForm barbers={barbers} haircuts={haircuts} customers={customers} />
                    </Route>
                    <Route path="/" component={MainPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
