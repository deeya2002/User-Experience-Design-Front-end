// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getSinglePost } from '../apis/Api'; // You need to implement this API call
// import { toast } from 'react-toastify';
// import '../css/journalstyle.css';

// const JournalDetailPage = () => {
//   const { id } = useParams();
//   const [journal, setJournal] = useState(null);

//   useEffect(() => {
//     getSinglePost(id)
//       .then((res) => {
//         if (!res.data.success) {
//           toast.error(res.data.message);
//         } else {
//           setJournal(res.data.journal);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error('Error fetching journal!');
//       });
//   }, [id]);

//   if (!journal) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="JournalDetailPage">
//       <h2>{journal.postTitle}</h2>
//       <img src={journal.postImageUrl} alt={journal.postTitle} className="journal-image" />
//       <p>{journal.postDescription}</p>
//       <p><strong>Location:</strong> {journal.postLocation}</p>
//       {/* Add like, comment, share buttons as needed */}
//     </div>
//   );
// };

// export default JournalDetailPage;
