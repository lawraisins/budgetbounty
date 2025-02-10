import React, { useState, useEffect } from 'react';
import RewardsCard from './RewardsCard';
import image from '../../images/rewards.jpg';
import '../../styles/Rewards.css';

const Modal = ({ reward, onConfirm, onCancel }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Confirm Redemption</h2>
      <p>Are you sure you want to redeem {reward.rewardName} for {reward.pointsRequired} points?</p>
      <div className="modal-buttons">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

const RewardsCatalogue = () => {
  const [rewards, setRewards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [showAllRewards, setShowAllRewards] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [userPoints, setUserPoints] = useState(0); // Points state received from RewardsCard

  useEffect(() => {
    fetch('http://localhost:8087/rewards/all')
      .then(response => response.json())
      .then(data => setRewards(data))
      .catch(error => console.error('Error fetching rewards:', error));
  }, []);

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const userId = localStorage.getItem('userId');    
    if (!userId) {
      alert("User not logged in");
      setIsModalOpen(false);
      return;
    }
  
    fetch(`http://localhost:8087/redemptions/redeem?userId=${userId}&rewardId=${selectedReward.rewardId}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        alert('Redemption successful!');
        setRedeemedRewards([...redeemedRewards, selectedReward.rewardId]);
        
        // Update points after redemption
        const updatedPoints = data.user.totalPoints;  // Get updated points from response
        setUserPoints(updatedPoints); // Update the points in frontend state
  
        // Hide modal after redemption
        setIsModalOpen(false);
      }
    })
    .catch(error => {
      console.error('Error redeeming reward:', error);
      alert('Failed to redeem reward');
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sortedRewards = [...rewards].sort((a, b) => {
    switch (sortOption) {
      case 'points-asc':
        return a.pointsRequired - b.pointsRequired;
      case 'points-desc':
        return b.pointsRequired - a.pointsRequired;
      case 'alpha-asc':
        return a.rewardName.localeCompare(b.rewardName);
      case 'alpha-desc':
        return b.rewardName.localeCompare(a.rewardName);
      case 'affordable':
        return a.pointsRequired - b.pointsRequired;
      default:
        return 0;
    }
  });

  const filteredRewards = sortOption === 'affordable'
    ? sortedRewards.filter(reward => reward.pointsRequired <= userPoints)
    : sortedRewards;

  return (
    <div className="rewards-page">
      
      <div className="rewards-content">
        <h1>Rewards Catalogue</h1>
        <p>
              Use your reward points to unlock exclusive deals and discounts.
            </p>
            <p>
              Browse the options below to redeem your points!
            </p>
        <div className='reward-points-card'>
          <div className="rewards-image">
            <img src={image} alt="Thumbs Up Illustration" />
          </div>
          <div className="rewards-content">
            <RewardsCard setPoints={setUserPoints} /> {/* Pass setPoints function to update userPoints */}
            <div className="sort-controls">
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Default</option>
                <option value="points-asc">Points (Low to High)</option>
                <option value="points-desc">Points (High to Low)</option>
                <option value="alpha-asc">Alphabetical (A-Z)</option>
                <option value="alpha-desc">Alphabetical (Z-A)</option>
                <option value="affordable">Affordable (Within My Points)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="reward-cards">
          {(showAllRewards ? filteredRewards : filteredRewards.slice(0, 3)).map((reward) => (
            <div
              key={reward.rewardId}
              className="reward-card"
              style={{
                opacity: redeemedRewards.includes(reward.rewardId) ? 0.5 : 1,
                pointerEvents: redeemedRewards.includes(reward.rewardId) ? 'none' : 'auto',
              }}
            >
              <h3>{reward.rewardName}</h3>
              <p>{reward.pointsRequired} Points</p>
              <button
                onClick={() => handleRedeemClick(reward)}
                disabled={redeemedRewards.includes(reward.rewardId)}
              >
                {redeemedRewards.includes(reward.rewardId) ? 'Redeemed' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>

        {!showAllRewards && (
          <button className="all-rewards" onClick={() => setShowAllRewards(true)}>
            View All Rewards
          </button>
        )}
        {showAllRewards && (
          <button className="all-rewards" onClick={() => setShowAllRewards(false)}>
            Collapse Rewards
          </button>
        )}
      </div>

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

export default RewardsCatalogue;
