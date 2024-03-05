import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header"
import Barber from './Barber'
import MainPage from "./MainPage";
import styles from "./react.css"
import Customer from './Customer'

function App() {
  return (
    <div className="app_div">
      <Header />
      <MainPage />
      <Barber />
      <Customer />
      
    </div>
  );
}

export default App;
