import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import WelcomeBanner from "../WelcomeBanner";
import "../../styles/Payments.css";

const Payments = ({ isAdmin }) => {
  const navigate = useNavigate();

  // Redirect Admin to Add Bill when Payments is accessed
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/add-bill");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="payments-page">
      {!isAdmin && (
        <>
          <WelcomeBanner text="Manage Payments at Your Fingertips" />
          <nav>
            <ul>
              <li><Link to="manage">Manage Payments</Link></li>
              <li><Link to="add">Add New Payment</Link></li>
              <li><Link to="history">Payment History</Link></li>
            </ul>
          </nav>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Payments;
