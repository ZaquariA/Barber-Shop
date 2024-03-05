import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header"
import Barber from './Barber'
import MainPage from "./MainPage";
import styles from "./react.css"

function App() {
  return (
    <div className="app_div">
      <Header />
      <MainPage />
      <Barber />
      
    </div>
  );
}

export default App;
