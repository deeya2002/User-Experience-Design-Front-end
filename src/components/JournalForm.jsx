import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createJournalApi } from '../apis/Api';
import '../css/journalstyle.css';

const JournalForm = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [journalImage, setJournalImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setJournalImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postTitle || !postDescription || !postLocation || !journalImage) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('postTitle', postTitle);
    formData.append('postDescription', postDescription);
    formData.append('postLocation', postLocation);
    formData.append('postImageUrl', journalImage);

    createJournalApi(formData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setPostTitle('');
          setPostDescription('');
          setPostLocation('');
          setJournalImage(null);
          setPreviewImage(null);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal Server Error!');
      });
  };

  return (
    <div className="journal-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Journal Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Journal Description"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={postLocation}
          onChange={(e) => setPostLocation(e.target.value)}
          required
        />
        <input type="file" className="form-control" onChange={handleImageUpload} />
        {previewImage && <img src={previewImage} className="img-fluid rounded object-cover mt-2" alt="Preview" />}
        <button type="submit">Add Journal</button>
      </form>
    </div>
  );
};

export default JournalForm;
