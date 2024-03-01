import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header"
import Barber from './Barber'
import Haircut from './Haircut'
import MainPage from "./MainPage";
import styles from "./react.css"
import Customer from './Customer'

function App() {
  return (
    <div className="app_div">
      <Header />
      <Router>
        <Switch>
        <Route exact path="/haircuts" component={Haircut}/>
        <Route exact path="/barbers" component={Barber}/>
        <Route path="/" component={MainPage}/>
        </Switch>
      </Router>
      {/* <Barber />
      <Customer /> */}
      
    </div>
  );
}

export default App;
