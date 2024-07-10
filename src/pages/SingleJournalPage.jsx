import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { followUserApi, getSingleJournalApi, likeJournalApi, saveJournalApi } from '../apis/Api';
import '../css/journalstyle.css';

const SingleJournalPage = () => {
  const { _id } = useParams();
  const [journalDetails, setJournalDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJournalDetails = async () => {
      try {
        const response = await getSingleJournalApi(_id);
        setJournalDetails(response.data.journal);
        setIsFollowing(response.data.journal.isFollowing);  // Assuming the API returns this info
        setIsLiked(response.data.journal.isLiked);          // Assuming the API returns this info
        setIsSaved(response.data.journal.isSaved);          // Assuming the API returns this info
      } catch (err) {
        console.error('Error fetching journal details:', err);
        setError('Failed to fetch journal details');
      } finally {
        setLoading(false);
      }
    };
    fetchJournalDetails();
  }, [_id]);

  const handleFollow = async () => {
    try {
      await followUserApi(journalDetails.createdBy._id);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Error following user:', err);
      setError('Failed to follow user');
    }
  };

  const handleLike = async () => {
    try {
      await likeJournalApi(_id);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Error liking journal:', err);
      setError('Failed to like journal');
    }
  };

  const handleSave = async () => {
    try {
      await saveJournalApi(_id);
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving journal:', err);
      setError('Failed to save journal');
    }
  };

  const handleComment = (event) => {
    setComments(event.target.value);
  };

  const submitComment = async () => {
    try {
      // Implement the API call for submitting a comment here
      // await submitCommentApi(_id, comments);
      setComments('');
    } catch (err) {
      console.error('Error commenting on journal:', err);
      setError('Failed to comment on journal');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!journalDetails) {
    return <p>No journal details found.</p>;
  }

  return (
    <div>
      <img
        src={journalDetails.journalImageUrl || 'default-image.jpg'}
        alt={journalDetails.journalName}
        style={{ width: '250px', height: '160px', borderRadius: '5px' }}
      />
      <h1>{journalDetails.journalName}</h1>
      <p>{journalDetails.journalDescription}</p>
      <p><strong>Location:</strong> {journalDetails.journalLocation}</p>
      
      <div>
        <FontAwesomeIcon
          icon={faUserPlus}
          onClick={handleFollow}
          style={{ cursor: 'pointer', color: isFollowing ? 'blue' : 'black' }}
          title={isFollowing ? 'Unfollow' : 'Follow'}
        />
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleLike}
          style={{ cursor: 'pointer', color: isLiked ? 'red' : 'black', marginLeft: '10px' }}
          title={isLiked ? 'Unlike' : 'Like'}
        />
        <FontAwesomeIcon
          icon={faBookmark}
          onClick={handleSave}
          style={{ cursor: 'pointer', color: isSaved ? 'green' : 'black', marginLeft: '10px' }}
          title={isSaved ? 'Unsave' : 'Save'}
        />
      </div>
      
      <div>
        <textarea
          value={comments}
          onChange={handleComment}
          placeholder="Write a comment..."
        />
        <button onClick={submitComment}>Submit Comment</button>
      </div>
      
      {/* Display existing comments here */}
    </div>
  );
};

export default SingleJournalPage;
