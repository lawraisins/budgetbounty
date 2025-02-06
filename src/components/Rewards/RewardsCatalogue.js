import React, { useState, useEffect } from 'react';
import RewardsCard from './RewardsCard';
import image from '../../images/rewards.jpg';
import '../../styles/Rewards.css';

const RewardsCatalogue = () => {
  const [rewards, setRewards] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [userPoints, setUserPoints] = useState(50); // Example user points (Replace with actual data)

  useEffect(() => {
    fetch('http://localhost:8087/rewards/all')
      .then(response => response.json())
      .then(data => setRewards(data))
      .catch(error => console.error('Error fetching rewards:', error));
  }, []);

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
      default:
        return 0;
    }
  });

  return (
    <div className="rewards-content">
      <h1>Rewards Catalogue</h1>
      <div className='reward-points-card'>
      <div className="rewards-image">
          <img src={image} alt="Thumbs Up Illustration" />
        </div>
        <RewardsCard />
      </div>
      <p>Use your reward points to unlock exclusive deals and discounts.</p>
      
      <div className="filters">
        <label>Sort by:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Default</option>
          <option value="points-asc">Points (Low to High)</option>
          <option value="points-desc">Points (High to Low)</option>
          <option value="alpha-asc">Alphabetical (A-Z)</option>
          <option value="alpha-desc">Alphabetical (Z-A)</option>
        </select>
      </div>

      <div className="reward-cards">
        {sortedRewards.map((reward) => (
          <div key={reward.rewardId} className="reward-card">
            <h3>{reward.rewardName}</h3>
            <p>{reward.pointsRequired} Points</p>
            <button>Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsCatalogue;
