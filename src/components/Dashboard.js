import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import WelcomeBanner from './WelcomeBanner';
import dash1 from '../images/dash1.jpg';
import dash2 from '../images/dash2.jpg';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('User');
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get userId from local storage

    if (userId) {
      axios.get(`http://localhost:8087/auth/${userId}`)
        .then(response => {
          if (response.data) {
            setFirstName(response.data.firstName || 'User');
            setTotalPoints(response.data.totalPoints || 0);
          }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className="dashboard-page">
      <WelcomeBanner text={`Welcome to Budget Bounty, ${firstName}`} />
      <div className="dashboard-top">
        <div className="dashboard-text">
          <h2>Pay it safe with built-in security</h2>
          <p>Count on peace of mind when you make payments. Your transactions are encrypted.</p>
          <button>Learn About PayPal Security</button>
        </div>
        
        <div className="dashboard-image">
          <img src={dash1} alt="Security Illustration" />
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Reward Points</h3>
          <p>{totalPoints}</p>
        </div>
        <div className="card">
          <h3>Next Payment</h3>
          <p>23 June</p>
        </div>
        <div className="card">
          <img src={dash2} alt="Preferred Card" />
          <h3>Pay with your preferred card.</h3>
          <p>Link all your cards and keep earning rewards from your favorite cards.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
