import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createJournalApi } from '../apis/Api'; // Ensure this API method is implemented
import '../css/AddJournalPage.css'; // Import the CSS file

const AddJournalPage = () => {
  const [journalName, setJournalName] = useState('');
  const [journalDescription, setJournalDescription] = useState('');
  const [journalLocation, setJournalLocation] = useState('');
  const [journalImageUrl, setJournalImageUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error] = useState(null);

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
    if (file) {
      setJournalImageUrl(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClickImage = () => {
    document.getElementById('journalImage').click();
  };

  return (
    <div className="add-journal-container">
      <h2>Create a Journal</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="image-upload">
          <input
            onChange={handleImageUpload}
            type="file"
            id="journalImage"
            style={{ display: 'none' }} // Hide the default file input
          />
          <label htmlFor="journalImage" onClick={handleClickImage}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="image-preview"
                onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
              />
            ) : (
              'Add Image'
            )}
          </label>
          {previewImage && (
            <button type="button" onClick={() => setPreviewImage(null)}>
              Remove Image
            </button>
          )}
        </div>
        <div className="form-group">
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
          <label>
            Journal Location:
            <input
              type="text"
              value={journalLocation}
              onChange={(e) => setJournalLocation(e.target.value)}
              required
            />
          </label>
          <button type="submit">Upload Journal</button>
        </div>
      </form>
    </div>
  );
};

export default AddJournalPage;
