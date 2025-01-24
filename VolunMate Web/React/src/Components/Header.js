import React from 'react';
import logo from './logo.png';

const Header = ({ handleNavigation }) => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="VolunMate Logo" className="logo-image" />
        <h1>VolunMate</h1>
        </div>
      <nav>
        <ul>
          <li>
            <a href="#intro" onClick={(e) => { e.preventDefault(); handleNavigation('intro'); }}>Home</a>
          </li>
          <li>
            <a href="#login" onClick={(e) => { e.preventDefault(); handleNavigation('login'); }}>Login</a>
          </li>
          <li>
            <a href="#signup" onClick={(e) => { e.preventDefault(); handleNavigation('signup'); }}>Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
