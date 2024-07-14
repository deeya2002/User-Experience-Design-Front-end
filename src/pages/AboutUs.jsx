import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/aboutstyle.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="about-us-container">
      <div className="about-us-text">
        <h2>About Us</h2>
        <p>Welcome to Travel Log!</p>
        <p>We at Travel Log think that adventure and travel are essential parts of living life to the fullest. We want to share our experiences with other travelers just like you since we are passionate about traveling to new places, experiencing different cultures, and finding hidden treasures.</p>
        <button type="button" onClick={handleContactClick}>Contact Us</button>
      </div>
    </div>
  );
};

export default AboutUs;
