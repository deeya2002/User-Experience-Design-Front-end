import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createJournalApi } from '../apis/Api'; // Ensure this API method is implemented
import '../css/AddJournalPage.css'; // Import the CSS file

const AddJournalPage = () => {
  const navigate = useNavigate();
  const [journalName, setJournalName] = useState('');
  const [journalDescription, setJournalDescription] = useState('');
  const [journalLocation, setJournalLocation] = useState('');

  const [journalImageUrl, setJournalImageUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('journalName', journalName);
    formData.append('journalDescription', journalDescription);
    formData.append('journalImage', journalImageUrl);
    formData.append('journalLocation', journalLocation);

    createJournalApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal Server Error!');
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setJournalImageUrl(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="add-journal-container">
      <h2>Add New Journal</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Journal Name:
          <input
            type="text"
            value={journalName}
            onChange={(e) => setJournalName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={journalDescription}
            onChange={(e) => setJournalDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <div className="image-upload">
          <input onChange={handleImageUpload} type="file" id="journalImage" />
          <label htmlFor="journalImage">Click to upload photo</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="image-preview img-fluid rounded object-cover mt-2"
            />
          )}
        </div>
        <br />
        <label>
          Journal Location:
          <input
            type="text"
            value={journalLocation}
            onChange={(e) => setJournalLocation(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Journal</button>
      </form>
    </div>
  );
};

export default AddJournalPage;
