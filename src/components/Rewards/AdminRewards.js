import React, { useState, useEffect } from 'react';
import '../../styles/AdminRewards.css';

const AdminRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({ rewardName: "", pointsRequired: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch all rewards
  useEffect(() => {
    fetch('http://localhost:8087/rewards/all')
      .then(response => response.json())
      .then(data => setRewards(data))
      .catch(error => console.error('Error fetching rewards:', error));
  }, []);

  // Handle Delete Reward
  const handleDelete = (rewardId) => {
    fetch(`http://localhost:8087/rewards/${rewardId}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to delete reward.");
        }
        setRewards(rewards.filter(reward => reward.rewardId !== rewardId));
        setSuccessMessage("Reward deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting reward:", error);
        setErrorMessage("Failed to delete reward.");
      });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle Add Reward
  const handleAddReward = (e) => {
    e.preventDefault();
    if (!newReward.rewardName.trim() || !newReward.pointsRequired.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    const rewardData = {
      rewardName: newReward.rewardName,
      pointsRequired: parseInt(newReward.pointsRequired),
    };

    fetch("http://localhost:8087/rewards/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rewardData),
    })
      .then(response => response.json())
      .then(data => {
        setRewards([...rewards, data]);
        setSuccessMessage("Reward added successfully!");
        setNewReward({ rewardName: "", pointsRequired: "" }); // Reset form
      })
      .catch(error => {
        console.error("Error adding reward:", error);
        setErrorMessage("Failed to add reward.");
      });
  };

  return (
    <div className="admin-rewards-page">
      <h1>Manage Rewards</h1>

      {/* Success & Error Messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Add New Reward Form */}
      <div className="add-reward-form">
        <h2>Add New Reward</h2>
        <form onSubmit={handleAddReward}>
          <input
            type="text"
            name="rewardName"
            placeholder="Reward Name"
            value={newReward.rewardName}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="pointsRequired"
            placeholder="Points Required"
            value={newReward.pointsRequired}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Reward</button>
        </form>
      </div>

      {/* Rewards List */}
      <div className="reward-list">
        <h2>Existing Rewards</h2>
        {rewards.length === 0 ? (
          <p>No rewards available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Reward Name</th>
                <th>Points Required</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map(reward => (
                <tr key={reward.rewardId}>
                  <td>{reward.rewardName}</td>
                  <td>{reward.pointsRequired}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(reward.rewardId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminRewards;
