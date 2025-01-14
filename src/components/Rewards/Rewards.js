import React from 'react';
import WelcomeBanner from '../WelcomeBanner'; // Adjust the path as needed
import '../../styles/Rewards.css'; // Adjust the path as needed

const Rewards = () => {
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
        {/* Example reward items */}
        <div className="reward-items">
          <div className="reward-item">
            <h3>$20 Nike Voucher</h3>
            <p>50 Points</p>
            <button>Redeem</button>
          </div>
          <div className="reward-item">
            <h3>$10 Adidas Voucher</h3>
            <p>30 Points</p>
            <button>Redeem</button>
          </div>
          <div className="reward-item">
            <h3>$40 New Balance Voucher</h3>
            <p>70 Points</p>
            <button>Redeem</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
