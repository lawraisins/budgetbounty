import React from 'react';
import '../styles/WelcomeBanner.css';

const WelcomeBanner = ({ text }) => {
  return (
    <div className="welcome-banner">
      <h1>{text}</h1>
    </div>
  );
};

export default WelcomeBanner;
