import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation
import { toast } from 'react-toastify';
import { deleteJournalApi, getSingleUserApi, getUserJournalApi } from '../apis/Api';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const user = JSON.parse(localStorage?.getItem("user")) || null;


  // State to manage user data
  const [fullname, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');
  const [userImageUrl, setUserImage] = useState('');

  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data
  useEffect(() => {
    const data = { userId: user?._id };
    getSingleUserApi(data)
      .then(res => {
        setFullName(res.data.singleuser.fullname ?? '');
        setUserName(res.data.singleuser.username ?? '');
        setEmail(res.data.singleuser.email ?? '');
        setNumber(res.data.singleuser.number ?? '');
        setLocation(res.data.singleuser.location ?? '');
        setBio(res.data.singleuser.bio ?? '');
        setOccupation(res.data.singleuser.occupation ?? '');
        setUserImage(res.data.singleuser.userImageUrl ?? '');
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [user?._id]);

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
  }, [user?._id]);

  const handleEdit = (id) => {
    console.log("fjghdfhgfh", id)
    navigate(`/editjournal/${id}`)
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this journal?');
    if (!confirmDelete) {
      return;
    } else {
      deleteJournalApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setJournals((prevJournals) => prevJournals.filter((journal) => journal._id !== id));
        }
      });
    }
  };

  const navigateToJournal = (journalId) => {
    navigate(`/journal/${journalId}`); // Navigate to the journal page
  };

  const handleClick = () => {
    navigate('/editprofile');
  };

  return (
    <div>
      <main>
        <section className="about-me">
          <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>About Me</p>
          <p>{bio}</p>
        </section>
        <section className="recents">
          <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Recent Posts</p>
          {loading ? (
            <div>Loading...</div>
          ) : journals.length > 0 ? (
            journals.map(journal => (
              <div
                key={journal._id}
                className="journal"
                onClick={() => navigateToJournal(journal._id)} // Navigate on click
              >
                <h2 className="journal-title">{journal.journalName}</h2>
                {journal.journalImageUrl && <img src={journal.journalImageUrl} alt={journal.journalName} />}
                <div className="journal-actions">
                  <FaEdit onClick={(e) => { e.stopPropagation(); handleEdit(journal._id); }} /> {/* Edit icon */}
                  <FaTrash onClick={(e) => { e.stopPropagation(); handleDelete(journal._id); }} /> {/* Delete icon */}
                </div>
              </div>
            ))
          ) : (
            <p>No journals found</p>
          )}
        </section>
        <section className="profile">
          <div className="info">
            <img
              src={userImageUrl || "/assets/images/noavatar.jpg"}
              alt="profile-pic"
              className="profile-pic"
            />
            <h3 style={{ textDecoration: 'underline' }}>My Profile</h3>
            <br></br>
            <div className="user-info">
              <p>Full Name : {fullname}  </p>
              <br></br>
              <p>User Name : {username}</p>
              <br></br>
              <p>Phone Number : {number}</p>
              <br></br>
              <p>My Email : {email}</p>
              <br></br>
              <p>Location : {location}</p>
              <br></br>
              <p>Occupation : {occupation}</p>
              <br></br>
            </div>
          </div>
          <button type="button" onClick={handleClick}>
            Edit Profile
          </button>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;



