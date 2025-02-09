import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import WelcomeBanner from "../WelcomeBanner";
import "../../styles/Payments.css";

const Payments = ({ isAdmin }) => {
  return (
    <div className="payments-page">
      <WelcomeBanner text="Manage Payments at Your Fingertips" />
      <nav>
        <ul>
          {isAdmin ? (
            <li>
              <Link to="/admin/add-bill">Add Bills</Link>
            </li>
          ) : (
            <>
              <li><Link to="manage">Manage Payments</Link></li>
              <li><Link to="add">Add New Payment</Link></li>
              <li><Link to="history">Payment History</Link></li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Payments;
