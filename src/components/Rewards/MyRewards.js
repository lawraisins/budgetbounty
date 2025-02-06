import React from 'react';
import WelcomeBanner from '../WelcomeBanner'; // Adjust the path as needed
import RewardsCard from './RewardsCard';
import { Link } from 'react-router-dom';
import '../../styles/Rewards.css'; // Adjust the path as needed

const Rewards = () => {
  return (
    <div className="rewards-page">
      {/* Welcome Banner */}
      <WelcomeBanner text="Earn and Redeem Rewards on the Go!" />
      {/* Rewards Content */}
      <div className="rewards-content">
      <h1>My Rewards</h1>
      {/* <RewardsCard/> */}
        {/* Add your rewards-specific content here */}
        {/* Example reward items */}
        <div className="my-rewards">
         <ul>
            <li>Swensen's 10% off</li>
            <li>Haidilao 15% off</li>
            <li>$15 Puma voucher</li>
         </ul>
        </div>
        <Link to="/rewards"><button className="rewards-button">Return to Rewards</button></Link>
      </div>
    </div>
  );
};

export default Rewards;
