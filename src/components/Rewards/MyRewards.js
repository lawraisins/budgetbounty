import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WelcomeBanner from '../WelcomeBanner'; // Adjust the path as needed
import '../../styles/Rewards.css'; // Adjust the path as needed

const MyRewards = () => {
  const [myRewards, setMyRewards] = useState([]);
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8087/redemptions/user/${userId}`)
        .then(response => response.json())
        .then(data => setMyRewards(data))
        .catch(error => console.error("Error fetching rewards:", error));
    }
  }, [userId]);

  return (
    <div className="rewards-page">
      {/* Welcome Banner */}
      <WelcomeBanner text="Earn and Redeem Rewards on the Go!" />

      {/* Rewards Content */}
      <div className="rewards-content">
        <h1>My Rewards</h1>

        {/* My Rewards displayed in reward-cards format */}
        <div className="reward-cards">
          {myRewards.length > 0 ? (
            myRewards.map((reward) => (
              <div key={reward.redemptionId} className="reward-card">
                <h3>{reward.reward.rewardName}</h3>
                <p>Redeemed: {reward.redemptionDate}</p>
                <p>Expires: {reward.expiryDate}</p>
                <p>Status: {reward.status}</p>
              </div>
            ))
          ) : (
            <p>No rewards redeemed yet.</p>
          )}
        </div>

        <Link to="/rewards">
          <button className="rewards-button">Return to Rewards</button>
        </Link>
      </div>
    </div>
  );
};

export default MyRewards;
