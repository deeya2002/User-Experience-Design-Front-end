import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { createJournalApi } from '../apis/Api'; // Ensure this API method is implemented

const AddJournalPage = () => {
  const navigate = useNavigate();
    // Make useState
    const [journalName, setJournalName] = useState('')
    const [journalDescription, setJournalDescription] = useState('')
    const [journalLocation, setJournalLocation] = useState('')

  
  // make useState for image
  const [journalImageUrl, setJournalImageUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [error, setError] = useState(null);

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('journalName', journalName)
        formData.append('journalDescription', journalDescription)
        formData.append('journalImage', journalImageUrl)
        formData.append('journalLocation', journalLocation)

        // send request to backend API
        createJournalApi(formData).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Internal Server Error!')
        })

    }
     // image upload function
     const handleImageUpload = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setJournalImageUrl(file)
        setPreviewImage(URL.createObjectURL(file))
    }

  return (
    <div>
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
        <label>Journal Image</label>
                                    <input onChange={handleImageUpload} type="file" className='form-control' />

                                    {/* Preview Image */}

                                    {
                                        previewImage && <img src={previewImage} className='img-fluid rounded object-cover mt-2' />
                                    }
        <br />
        <button type="submit">Add Journal</button>
      </form>
    </div>
  );
};

export default AddJournalPage;