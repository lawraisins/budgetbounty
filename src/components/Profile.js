import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import WelcomeBanner from './WelcomeBanner';
import profile from '../images/profile.jpg';
import RewardsCard from './Rewards/RewardsCard';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
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
            <h2>John Doe</h2>
            <p>Count on peace of mind when you make payments. Your transactions are encrypted.</p>
            <p>Email: johndoe@mail.com</p>
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
