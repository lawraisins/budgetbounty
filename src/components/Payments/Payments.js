import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/Payments.css';

const Payments = () => {
  return (
    <div className="payments-page">
      <h1>Manage Payments at Your Fingertips</h1>
      <nav>
        <ul>
          <li><Link to="manage">Manage Payments</Link></li>
          <li><Link to="add">Add New Payment</Link></li>
          <li><Link to="history">Payment History</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Payments;
