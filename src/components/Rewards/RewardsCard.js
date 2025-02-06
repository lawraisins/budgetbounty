import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Rewards.css'; // Adjust the path as needed

const RewardsCard = () => {
  // const points = 250; // You can dynamically set this value based on your app's state
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const userId = 1; // Get userId from local storage

    if (userId) {
      axios.get(`http://localhost:8087/auth/${userId}`)
        .then(response => {
          if (response.data) {
            setPoints(response.data.totalPoints || 0);
          }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, []);

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
        <div
          className="points"
          style={{ background: getPointsBackgroundColor(points) }} // Set the background color based on points
        >
          <h4>{getMembershipTier({points})} Member</h4>
          <h1>{points}</h1>
          <h3>Points</h3>
        </div>

  );
};

export default RewardsCard;
