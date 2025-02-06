import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import WelcomeBanner from '../WelcomeBanner';
import RewardsCard from './RewardsCard';
import '../../styles/Rewards.css';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(50); // Example user points (Replace with actual data)

  useEffect(() => {
    fetch('http://localhost:8087/rewards/all')
      .then(response => response.json())
      .then(data => setRewards(data))
      .catch(error => console.error('Error fetching rewards:', error));
  }, []);

  return (
    <div className="payments-page">
      <WelcomeBanner text="Earn and Redeem Rewards on the Go!" />
      <nav>
        <ul>
          <li><Link to="">Rewards Catalogue</Link></li>
          <li><Link to="my">My Rewards</Link></li>
        </ul>
      </nav>

      {/* Outlet to render nested routes like MyRewards, RewardsCatalogue, etc. */}
      <Outlet />
    </div>
  );
};

export default Rewards;
