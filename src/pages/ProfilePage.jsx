import React, { useEffect, useState } from 'react';
import { getSingleUserApi, getUserJournalApi } from '../apis/Api';
import '../css/Profile.css';

const ProfilePage = () => {

  const user = JSON.parse(localStorage?.getItem("user")) || null;

  // State to manage user data
  const [fullname, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');

  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data
  useEffect(() => {
    const data = {
      userId: user?._id,
    };
    console.log("data", data)
    getSingleUserApi(data)
      .then(res => {
        setFullName(res.data.singleuser.fullname ?? '');
        setUserName(res.data.singleuser.username ?? '');
        setEmail(res.data.singleuser.email ?? '');
        setNumber(res.data.singleuser.number ?? '');
        setLocation(res.data.singleuser.location ?? '');
        setBio(res.data.singleuser.bio ?? '');
        setOccupation(res.data.singleuser.occupation ?? '');
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    const fetchUserJournals = async () => {
      try {
        const response = await getUserJournalApi(user?._id);
        setJournals(response.data.journals);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserJournals();
  }, []);

  const handleEdit = (journalId) => {
    // Logic to edit the journal
    console.log(`Edit journal with ID: ${journalId}`);
  };

  const handleDelete = (journalId) => {
    // Logic to delete the journal
    console.log(`Delete journal with ID: ${journalId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <main>
        <section className="about-me">
          <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>About Me</p>
          <p>{bio}</p>
        </section>
        <section className="recents">
          <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Recent Posts</p>
          {journals.length > 0 ? (
            journals.map(journal => (
              <div key={journal._id} className="journal">
                <h2>{journal.journalName}</h2>
                <p>{journal.journalDescription}</p>
                {journal.journalImageUrl && <img src={journal.journalImageUrl} alt={journal.journalName} />}
                <div className="journal-actions">
                  <button onClick={() => handleEdit(journal._id)}>Edit</button>
                  <button onClick={() => handleDelete(journal._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No journals found</p>
          )}
        </section>
        <section className="profile">
          <div className="info">
            <img src="/assets/images/dpic.jpg" alt="profile-pic" className="profile-pic" />
            <h3 style={{ textDecoration: 'underline' }}>My Profile</h3>
            <p>Love to travel and adventure!</p>
            <div className="user-info">
              <p>{fullname}</p>
              <p>{username}</p>
              <p>{number}</p>
              <p>{email}</p>
              <p>{location}</p>
              <p>{occupation}</p>
            </div>
          </div>
          <button type="button" onClick={() => { window.location.href = '#'; }}>
            Edit Profile
          </button>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
