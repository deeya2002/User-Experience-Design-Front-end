import React from 'react';
import searchIcon from '../assets/icon/search.png'; // Add your image path here
import '../css/homestyle.css'


const Homepage = () => {

    // const searchDat = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('foodName', searchQuery);

  //   try {
  //     const response = await searchByFoodName(formData);

  //     if (response.data?.foodNames && response.data.foodNames.length > 0) {
  //       const firstResultId = response.data.foodNames[0]._id;
  //       navigate(`/descriptionpage/${firstResultId}`);
  //     } else {
  //       console.log('No matching results found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Travel Journal</h1>
          <a href="#journals" className="learn-more-button">Explore Now!</a>
        </div>
      </header>
      <section id="journals" className="journals-section">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search your journals..." 
          />
          <img 
            src={searchIcon} 
            alt="Search" 
            className="search-icon" 
            // onClick={handleSearch}
          />
        </div>
        <h2>Your Journals</h2>
        <div className="journal-list">
        </div>
      </section>

            <footer>
        <p>&copy; 2024 Travel Log. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default Homepage;
