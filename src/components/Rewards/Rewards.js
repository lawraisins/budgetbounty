import React from 'react';
import WelcomeBanner from '../WelcomeBanner'; // Adjust the path as needed
import '../../styles/Rewards.css'; // Adjust the path as needed

const Rewards = () => {
  const points = 160; // You can dynamically set this value based on your app's state

  // Function to determine background color based on points
  const getPointsBackgroundColor = (points) => {
    if (points <= 100) return 'linear-gradient(to right, #ffffff, #f0f0f0)';
    if (points <= 250) return 'linear-gradient(to right, #c0c0c0, #d9d9d9)'; // Silver gradient
    return 'linear-gradient(to right, #ffd700, #ffac33, #ffc107)'; // Gold gradient
  };

  const getMembershipTier = (points) => {
    if (points <= 100) return 'Basic';
    if (points <= 250) return 'Silver';
    return 'Gold';
  };

  return (
    <div className="rewards-page">
      {/* Welcome Banner */}
      <WelcomeBanner text="Earn and Redeem Rewards on the Go!" />

      {/* Rewards Content */}
      <div className="rewards-content">
        {/* Add your rewards-specific content here */}
        <p>
          Use your reward points to unlock exclusive deals and discounts.
          Browse the options below to redeem your points!
        </p>
        <div
          className="points"
          style={{ background: getPointsBackgroundColor(points) }} // Set the background color based on points
        >
          <h4>{getMembershipTier(points)} Member</h4>
          <h1>{points}</h1>
          <h3>Points</h3>
          <button>View My Rewards</button>
        </div>
        {/* Example reward items */}
        <div className="reward-cards">
          <div className="reward-card">
            <h3>$20 Nike Voucher</h3>
            <p>50 Points</p>
            <button>Redeem</button>
          </div>
          <div className="reward-card">
            <h3>$10 Adidas Voucher</h3>
            <p>30 Points</p>
            <button>Redeem</button>
          </div>
          <div className="reward-card">
            <h3>$40 New Balance Voucher</h3>
            <p>70 Points</p>
            <button>Redeem</button>
          </div>
        </div>
        <button className="all-rewards">View All Rewards</button>
      </div>
    </div>
  );
};

export default Rewards;
