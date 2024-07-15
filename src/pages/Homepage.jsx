import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJournalsApi, searchByJournalName } from '../apis/Api';
import searchIcon from '../assets/icon/search.png'; // Add your image path here
import '../css/homestyle.css';

const Homepage = () => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchDat = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('journalName', searchQuery);

    try {
      const response = await searchByJournalName(formData);

      if (response.data?.journalNames && response.data.journalNames.length > 0) {
        const firstResultId = response.data.journalNames[0]._id;
        navigate(`/journal/${firstResultId}`);
      } else {
        // Handle the case when no results are found
        console.log('No matching results found');
      }
    } catch (error) {
      // Handle errors from the API request
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournalsApi();
        if (response.data && response.data.Journals) {
          setJournals(response.data.Journals);
          console.log('All journal data fetched', response.data.Journals);
        }
      } catch (err) {
        console.error('Failed to fetch journals:', err);
        setError('Failed to fetch journals');
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
          <form onSubmit={searchDat}>
            <input
              type="text"
              placeholder="Search your journals..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src={searchIcon}
              alt="Search"
              className="search-icon"
            />
          </form>
        </div>
        <h2>Journals</h2>
        <div className="journal-list">
          {journals.map((journal) => (
            <div
              key={journal._id}
              className="journal-item"
              onClick={() => navigate(`/journal/${journal._id}`)} // Navigate to the journal detail page on click
            >
              <p>By {journal.userDetails.username}</p>
              <p className="journal-location">{journal.journalLocation}</p>
              <img
                src={journal.journalImageUrl}
                alt={journal.journalName}
                className="journal-image"
              />
              <div className="journal-details">
                <h3>{journal.journalName}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
