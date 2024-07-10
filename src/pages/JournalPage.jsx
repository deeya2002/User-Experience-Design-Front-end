import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJournalsApi } from '../apis/Api';
import '../css/journalstyle.css';

const JournalPage = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournalsApi();
        if (response.data && response.data.Journals) {
          setJournals(response.data.Journals);
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

  const handleReadMore = (id) => {
    navigate(`/journal/${id}`);
  };

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
              <p>
                {`${journal.journalDescription.substring(0, 100)}...`} {/* Adjust the character limit as needed */}
              </p>
              <button type="button" onClick={() => handleReadMore(journal._id)}>
                Read More
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
