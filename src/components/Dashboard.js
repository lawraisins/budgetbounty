import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import WelcomeBanner from './WelcomeBanner';
import RewardsCard from './Rewards/RewardsCard';
import dash1 from '../images/dash1.jpg';
import dash2 from '../images/dash2.jpg';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('User');
  const [totalPoints, setTotalPoints] = useState(0);
  const [nextPayments, setNextPayments] = useState([]); // Change to an array to store multiple bills

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

      // Fetch unpaid bills due within 10 days
      axios.get(`http://localhost:8087/bills/unpaid-due-10days/${userId}`)
        .then(response => {
          if (response.data.length > 0) {
            // Sort bills by due date (earliest first)
            const sortedBills = response.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setNextPayments(sortedBills.slice(0, 3)); // Store up to 3 bills
          }
        })
        .catch(error => console.error("Error fetching next payment:", error));
    }
  }, []);

  return (
    <div className="dashboard-page">
      <WelcomeBanner text={`Welcome to Budget Bounty, ${firstName}`} />
      <div className="dashboard-top">
        <div className="dashboard-text">
          <h2>Pay and Earn Rewards!</h2>
          <p>Track your bills, make payments on time and get rewarded! Rewards earned can be used to redeem gifts issued by BudgetBounty's official partners.</p>
          <button>Get Started with Bill Management Today</button>
        </div>
        
        <div className="dashboard-image">
          <img src={dash1} alt="Security Illustration" />
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Reward Points</h3>
          <div className='reward-points-card'>
            <RewardsCard />
          </div>
        </div>
        
        <div className="card">
          <h3>Bills Due within Next 10 Days</h3>
          {nextPayments.length > 0 ? (
            <ul className="no-bullets" style={{ listStyleType: "none", padding: 20, margin: 0 }}>
            {nextPayments.map((bill, index) => (
              // <li key={index}>{bill.billName} - {new Date(bill.dueDate).toLocaleDateString()}</li>
              <li key={index}>{bill.billName} : ${bill.amount} - {new Date(bill.dueDate).toLocaleDateString()}</li>
            ))}
          </ul>
          ) : (
            <p>No upcoming bills due</p>
          )}
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
