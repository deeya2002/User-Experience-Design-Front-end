import { faBookmark, faHeart, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createComment, followUserApi, getComments, getSingleJournalApi, likeJournalApi, saveJournalApi } from '../apis/Api';
import '../css/PageStyle.css';

const SingleJournalPage = () => {
  const { _id } = useParams();
  const [journalDetails, setJournalDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJournalDetails = async () => {
      try {
        const response = await getSingleJournalApi(_id);
        setJournalDetails(response.data.journal);
        setIsFollowing(response.data.journal.isFollowing);
        setIsLiked(response.data.journal.isLiked);
        setIsSaved(response.data.journal.isSaved);
      } catch (err) {
        console.error('Error fetching journal details:', err);
        setError('Failed to fetch journal details');
      } finally {
        setLoading(false);
      }
    };
    fetchJournalDetails();
  }, [_id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(_id);
        console.log(_id)
        console.log(response.data?.comments[0]?.commentText)
        // 
        // [{_id: "6693cf1d9f88c41b7e33b5fb", commentText: "wowww", createdAt: "2024-07-14T13:14:05.129Z",…}]
        setComments(response.data?.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleFollow = async () => {
    const data = {
      followeeId: journalDetails.createdBy
    };

    try {
      await followUserApi(data);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Error following user:', err);
      setError('Failed to follow user');
    }
  };

  const handleLike = async () => {
    try {
      console.log(_id)
      const data = {
        journal_id: _id,
        user_id: user?._id
      }
      await likeJournalApi(data);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Error liking journal:', err);
      setError('Failed to like journal');
    }
  };

  const handleSave = async () => {
    try {
      console.log(_id)
      const data = {
        journal_id: _id,
        user_id: user?._id
      }
      await saveJournalApi(data);
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving journal:', err);
      setError('Failed to save journal');
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('commentText', commentText);
    formData.append('journalId', journalDetails._id)

    try {
      const res = await createComment(formData);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setComments([...comments, res.data.comment]);
        setCommentText('');
      }
    } catch (err) {
      console.error(err);
      toast.error('Comment has already been created!');
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
      <section className="title">
        <img
          src={journalDetails.journalImageUrl || 'default-image.jpg'}
          alt="Image description"
          style={{ width: '250px', height: '160px', borderRadius: '5px', float: 'inline-end' }}
        />
        <p style={{ fontWeight: 'bold' }}>{journalDetails.userDetails.username}</p>
        <p style={{ fontWeight: 'bold' }}>{journalDetails.journalLocation}</p>
        <h1>{journalDetails.journalName}</h1>
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
          <p>({journalDetails.likes.length})</p>
          <FontAwesomeIcon
            icon={faBookmark}
            onClick={handleSave}
            style={{ cursor: 'pointer', color: isSaved ? 'green' : 'black', marginLeft: '10px' }}
            title={isSaved ? 'Unsave' : 'Save'}
          />
        </div>
      </section>
      <main>
        <section className="description">
          <img
            src={journalDetails.journalImageUrl || 'default-image.jpg'}
            alt="Image description"
            style={{ width: '350', height: '300px', borderRadius: '10px' }}
          />
          <p>
            {journalDetails.journalDescription}
          </p>
        </section>
        <section className="journey">
          <img
            src={journalDetails.journalImageUrl || 'default-image.jpg'}
            alt="Image description"
            style={{ width: '350px', height: '260px', borderRadius: '5px' }}
          />
          <p>
            {journalDetails.journalDescription}
          </p>
        </section>
        <section className="comment-section">
          <h2>Comments</h2>
          <section className="comment-policy">
            <p style={{ fontWeight: 'bold' }}>Travel Log Comment Policy</p>
            <p style={{ fontSize: 'small' }}>
              Please be nice and friendly!<br />
              Please read our Comment Policy before commenting.
            </p>
          </section>
          <h3>Comments ({comments.length})</h3>
          <form onSubmit={submitComment}>
            <textarea
              name="comment"
              rows="5"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button type="submit">Comment</button>
          </form>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <p><strong>{comment.userDetails.username}</strong></p>
                <p>{comment.commentText}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleJournalPage;
