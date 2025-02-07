import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';
import WelcomeBanner from './WelcomeBanner';
import profile from '../images/profile.jpg';
import RewardsCard from './Rewards/RewardsCard';

const Profile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("User");
  const [earliestBill, setEarliestBill] = useState(null); // Store earliest unpaid bill

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    if (userId) {
      // Fetch user details
      axios.get(`http://localhost:8087/auth/${userId}`)
        .then(response => {
          if (response.data) {
            setFullName(`${response.data.firstName} ${response.data.lastName}` || "User");
          }
        })
        .catch(error => console.error("Error fetching user data:", error));

      // Fetch unpaid bills and get the earliest one
      axios.get(`http://localhost:8087/bills/unpaid/${userId}`)
        .then(response => {
          if (response.data.length > 0) {
            // Sort bills by due date (earliest first)
            const sortedBills = response.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setEarliestBill(sortedBills[0]); // Set only the first (earliest) bill
          }
        })
        .catch(error => console.error("Error fetching unpaid bills:", error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId"); 
    localStorage.removeItem("isAuthenticated"); // Remove authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-page">
      <WelcomeBanner text="Profile" />
      <div className="profile-content">
        <div className="profile-top">
          <div className="profile-main">
            <img src={profile} alt="profile-picture"/>
            <h2>{fullName}</h2>
            <button>Edit Profile</button>
            <button className='rewards-button' onClick={handleLogout}>Log Out</button>
          </div>        
        </div>

        <div className="profile-cards">
          <div className="card">
            <RewardsCard/>
          </div>
          <div className="card">
            <h3>Next Bill Due</h3>
            {earliestBill ? (
              <p>{earliestBill.billName} : ${earliestBill.amount} - {new Date(earliestBill.dueDate).toLocaleDateString('en-GB', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: '2-digit' 
                })}</p>
            ) : (
              <p>No unpaid bills due</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
