import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isAdmin }) => {
  return (
    <header>
      <nav>
        <ul>
          {/* Show Dashboard only for regular users */}
          {!isAdmin && <li><Link to="/">Dashboard</Link></li>}

          {/* Show Payments link for Admin, which redirects to Add Bill */}
          <li><Link to={isAdmin ? "/admin/add-bill" : "/payments"}>Payments</Link></li>

          <li><Link to="/rewards">Rewards</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
