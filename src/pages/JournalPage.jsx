// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getPostsApi } from '../apis/Api';
// import '../css/journalstyle.css';

// const JournalPage = () => {
//   const [journals, setJournals] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getPostsApi().then((res) => {
//       setJournals(res.data.posts);
//     });
//   }, []);

//   return (
//     <div className="JournalPage">
//       <h2>Your Journals</h2>
//       <div className="journal-list">
//         {journals.map((journal, index) => (
//           <Journal
//             key={index}
//             id={journal._id}
//             title={journal.postTitle}
//             description={journal.postDescription}
//             imageUrl={journal.postImageUrl}
//             location={journal.postLocation}
//           />
//         ))}
//       </div>
//       <button className="add-button" onClick={() => navigate('/add-journal')}>
//         +
//       </button>
//     </div>
//   );
// };

// const Journal = ({ id, title, description, imageUrl, location }) => {
//   return (
//     <article className="journal">
//       <img src={imageUrl} alt={title} className="journal-image" />
//       <div className="journal-content">
//         <h3>{title}</h3>
//         <p>{description.substring(0, 100)}...</p> {/* Show a short part of the description */}
//         <p><strong>Location:</strong> {location}</p>
//         <Link to={`/journal/${id}`} className="btn btn-outline-primary">Read More</Link>
//       </div>
//     </article>
//   );
// };

// export default JournalPage;
