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

  useEffect(() => {
    const userId = 1; // Retrieve userId from localStorage

    if (userId) {
      axios.get(`http://localhost:8087/auth/${userId}`)
        .then(response => {
          if (response.data) {
            setFullName(`${response.data.firstName} ${response.data.lastName}` || "User");
          }
        })
        .catch(error => console.error("Error fetching user data:", error));
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
            <h3>My Bills</h3>
            <p>23 June</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
