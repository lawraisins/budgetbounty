import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/payments">Payments</Link></li>
          <li><Link to="/rewards">Rewards</Link></li>
          <li><Link to="/login">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
