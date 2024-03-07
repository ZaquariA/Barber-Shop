import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.querySelector('.menu').classList.toggle('menu_open');
  };

  return (
    <div className="header">
      <h1 className="title">
        <a href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
          Code Cuts
        </a>
      </h1>
      <div className="menu_icon" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/haircuts">Haircuts</a>
          </li>
          <li>
            <a href="/barbers">Barbers</a>
          </li>
          <li>
            <a href="/customers">Customers</a>
          </li>
          <li>
            <a href="/customerform">New Customer</a>
          </li>
          <li>
            <a href="/appointments">Appointments</a>
          </li>
          <li>
            <a href="/appointmentForm">New Appointments</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
