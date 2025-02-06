import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeBanner from '../WelcomeBanner'; // Adjust the path as needed
import '../../styles/Rewards.css'; // Adjust the path as needed

const MyRewards = () => {
  const myRewardsData = [
    { id: 1, name: "Swensen's 10% off" },
    { id: 2, name: "Haidilao 15% off" },
    { id: 3, name: "$15 Puma voucher" },
  ];

  return (
    <div className="rewards-page">
      {/* Welcome Banner */}
      <WelcomeBanner text="Earn and Redeem Rewards on the Go!" />

      {/* Rewards Content */}
      <div className="rewards-content">
        <h1>My Rewards</h1>

        {/* My Rewards displayed in reward-cards format */}
        <div className="reward-cards">
          {myRewardsData.map((reward) => (
            <div key={reward.id} className="reward-card">
              <h3>{reward.name}</h3>
              <p>Redeemed</p>
            </div>
          ))}
        </div>

        <Link to="/rewards">
          <button className="rewards-button">Return to Rewards</button>
        </Link>
      </div>
    </div>
  );
};

export default MyRewards;