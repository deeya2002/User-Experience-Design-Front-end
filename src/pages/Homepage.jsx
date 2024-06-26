import React from 'react';
import '../css/homestyle.css';

const Homepage = () => {
  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Travel Journal</h1>
          <a href="#journals" className="learn-more-button">Learn More</a>
        </div>
      </header>
      <section id="journals" className="journals-section">
        <h2>Your Journals</h2>
        <div className="journal-list">
          <Journal title="Journal Title 1" description="Short description of the journal entry..." imageUrl="path_to_image1.jpg" />
          <Journal title="Journal Title 2" description="Short description of the journal entry..." imageUrl="path_to_image2.jpg" />
          <Journal title="Journal Title 3" description="Short description of the journal entry..." imageUrl="path_to_image3.jpg" />
          {/* Add more Journal components as needed */}
        </div>
      </section>
    </div>
  );
}

const Journal = ({ title, description, imageUrl }) => {
  return (
    <article className="journal">
      <img src={imageUrl} alt={title} className="journal-image" />
      <div className="journal-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default Homepage;
