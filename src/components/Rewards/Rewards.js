import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WelcomeBanner from '../WelcomeBanner'; // Adjust the path as needed
import RewardsCard from './RewardsCard';
import '../../styles/Rewards.css'; // Adjust the path as needed

// Modal component
const Modal = ({ reward, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Redemption</h2>
        <p>Are you sure you want to redeem {reward.name} for {reward.points} points?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const Rewards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setRedeemedRewards([...redeemedRewards, selectedReward.id]); // Add the redeemed reward ID to the list
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rewardsData = [
    { id: 1, name: '$20 Nike Voucher', points: 50 },
    { id: 2, name: '$10 Adidas Voucher', points: 30 },
    { id: 3, name: '$40 New Balance Voucher', points: 70 },
  ];

  return (
    <div className="rewards-page">
      {/* Welcome Banner */}
      <WelcomeBanner text="Earn and Redeem Rewards on the Go!" />

      {/* Rewards Content */}
      <div className="rewards-content">
        <p>
          Use your reward points to unlock exclusive deals and discounts.
          Browse the options below to redeem your points!
        </p>
        <RewardsCard />
        <Link to="/rewards/my"><button className="rewards-button">View My Rewards</button></Link>
        
        {/* Example reward items */}
        <div className="reward-cards">
          {rewardsData.map((reward) => (
            <div
              key={reward.id}
              className="reward-card"
              style={{
                opacity: redeemedRewards.includes(reward.id) ? 0.5 : 1,
                pointerEvents: redeemedRewards.includes(reward.id) ? 'none' : 'auto',
              }}
            >
              <h3>{reward.name}</h3>
              <p>{reward.points} Points</p>
              <button
                onClick={() => handleRedeemClick(reward)}
                disabled={redeemedRewards.includes(reward.id)}
              >
                {redeemedRewards.includes(reward.id) ? 'Redeemed' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
        
        <button className="all-rewards">View All Rewards</button>
      </div>

      {/* Modal for redemption confirmation */}
      {isModalOpen && (
        <Modal
          reward={selectedReward}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Rewards;
