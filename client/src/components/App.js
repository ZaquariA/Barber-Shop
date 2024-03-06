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
  return (
    <div className="app_div">
      <Header />
      <Router>
        <Switch>
        <Route exact path="/haircuts" component={Haircut}/>
        <Route exact path="/barbers" component={Barber}/>
        <Route exact path="/customers" component={Customer} />
        <Route exact path="/customerform" component={CustomerForm}/>
        <Route exact path="/appointments" component={Appointment}/>
        <Route exact path="/appointmentForm" component={AppointmentForm}/>
        <Route path="/" component={MainPage}/>
        </Switch>
      </Router>
      {/* <Barber />
      <Customer /> */}
      
    </div>
  );
}

export default App;
