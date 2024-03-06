import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header"
import Barber from './Barber'
import Haircut from './Haircut'
import MainPage from "./MainPage";
import styles from "./react.css"
import Customer from './Customer'
import CustomerForm from './CustomerForm'
import Appointment from './Appointment'
import AppointmentForm from './AppointmentForm'

function App() {
    const [barbers, setBarbers] = useState([]);
    const [haircuts, setHaircuts] = useState([]);

    useEffect(() => {
        fetch('/barbers')
         .then(res => res.json())
         .then(dataArr => setBarbers(dataArr));

        fetch('/haircuts')
         .then(res => res.json())
         .then(dataArr => setHaircuts(dataArr));
    }, []);


  return (
        <div className="app_div">
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/haircuts" component={Haircut} />
                    <Route exact path="/barbers" component={Barber} />
                    <Route exact path="/customers" component={Customer} />
                    <Route exact path="/customerform" component={CustomerForm} />
                    <Route exact path="/appointments" component={Appointment} />
                    <Route exact path="/appointmentForm" component = {AppointmentForm}>
                        <AppointmentForm barbers={barbers} haircuts={haircuts} />
                    </Route>
                    <Route path="/" component={MainPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
