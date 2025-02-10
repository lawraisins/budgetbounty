import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Rewards.css';

const RewardsCard = ({ setPoints }) => {
  const [points, setLocalPoints] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");  // Get userId from local storage

    if (userId) {
      axios.get(`http://localhost:8087/auth/${userId}`)
        .then(response => {
          if (response.data) {
            const totalPoints = response.data.totalPoints || 0;
            setLocalPoints(totalPoints);  // Update local points
            setPoints(totalPoints);       // Update points in parent
          }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, [setPoints]);

  const getPointsBackgroundColor = (points) => {
    if (points > 250) return 'linear-gradient(to right, #ffd700, #ffac33, #ffc107)';
    if (points >= 100) return 'linear-gradient(to right, #c0c0c0, #d9d9d9)';
    else return 'linear-gradient(to right, #ffffff, #f0f0f0)';
  };

  const getMembershipTier = (points) => {
    if (points > 250) return 'Gold';
    if (points >= 100) return 'Silver';
    else return 'Basic';
  };

  return (
    <div className="points" style={{ background: getPointsBackgroundColor(points) }}>
      <h4>{getMembershipTier(points)} Member</h4>
      <h1 id="pointscount">{points}</h1>
      <h3>Points</h3>
    </div>
  );
};

export default RewardsCard;
