import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJournalsApi } from '../apis/Api';
import '../css/Gallery.css';

const GalleryPage = () => {
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
                                src={journal.journalImageUrl}
                            />
                        </section>
                    ))
                ) : (
                    <p>No images available.</p>
                )}
            </main>
        </div>
    );
};

export default GalleryPage;
