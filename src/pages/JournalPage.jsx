import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJournalsApi } from '../apis/Api';
import '../css/journalstyle.css';

const JournalPage = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null); // Added state to handle errors
  const [loading, setLoading] = useState(true); // Added state to handle loading


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
    <div>
      <main>
        {journals.length > 0 ? (
          journals.map((journal) => (
            <section key={journal._id} className="entry">
              <img
                src={journal.journalImageUrl || 'default-image.jpg'}
                alt={journal.journalName}
                style={{ width: '250px', height: '160px', borderRadius: '5px', float: 'right' }}
              />
              <h3>{journal.journalName}</h3>
              <p>{journal.journalDescription}</p>
              <button type="button" onClick={() => navigate(`/journal/${journal._id}`)}>
                Read More...
              </button>
            </section>
          ))
        ) : (
          <p>No journals available.</p>
        )}
      </main>
      <button className="add-button" onClick={() => navigate('/add-journal')}>
        +
      </button>
    </div>
  );
};

export default JournalPage;
