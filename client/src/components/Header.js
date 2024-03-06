// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header_div">
      <Link to="/">
        <h1 className="title">Code Cuts</h1>
      </Link>
    </div>
  );
}

export default Header;
