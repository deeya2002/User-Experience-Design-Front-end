import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleJournalApi, updateJournalApi } from '../apis/Api';

const EditJournal = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [journalName, setJournalName] = useState('');
    const [journalDescription, setJournalDescription] = useState('');
    const [journalLocation, setJournalLocation] = useState('');
    const [journalImage, setJournalImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [oldImage, setOldImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load journal data
    useEffect(() => {
        const fetchJournalDetails = async () => {

            try {
                const response = await getSingleJournalApi(id);
                console.log(response.data)
                setJournalName(response.data.journal.journalName);
                setJournalDescription(response.data.journal.journalDescription);
                setJournalLocation(response.data.journal.journalLocation);
                setOldImage(response.data.journal.journalImageUrl);
            } catch (err) {
                console.error('Error fetching journal details:', err);
                setError('Failed to fetch journal details');
            } finally {
                setLoading(false);
            }
        };
        fetchJournalDetails();
    }, [id]);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setJournalImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('journalName', journalName);
        formData.append('journalDescription', journalDescription);
        formData.append('journalLocation', journalLocation);
        if (journalImage) {
            formData.append('journalImage', journalImage);
        }

        updateJournalApi(id, formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate('/journal');
                }
            })
            .catch((err) => {
                console.error('Error updating journal:', err);
                toast.error('Internal Server Error!');
            });
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Edit Journal</h2>
                <div style={styles.formContainer}>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div style={styles.formGroup}>
                            <label htmlFor='journalName'>Journal Name</label>
                            <input
                                id='journalName'
                                value={journalName}
                                onChange={(e) => setJournalName(e.target.value)}
                                style={styles.input}
                                type="text"
                                placeholder='Enter journal name'
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor='journalDescription'>Journal Description</label>
                            <textarea
                                id='journalDescription'
                                value={journalDescription}
                                onChange={(e) => setJournalDescription(e.target.value)}
                                style={styles.input}
                                placeholder="Enter description"
                                cols="4"
                                rows="4"
                            ></textarea>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor='journalLocation'>Location</label>
                            <input
                                id='journalLocation'
                                value={journalLocation}
                                onChange={(e) => setJournalLocation(e.target.value)}
                                style={styles.input}
                                type="text"
                                placeholder='Enter location'
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor='journalImage'>Journal Image</label>
                            <input
                                id='journalImage'
                                onChange={handleImageUpload}
                                type="file"
                                style={styles.input}
                            />
                        </div>

                        <button
                            type="submit"
                            style={styles.submitButton}
                        >
                            Update Journal
                        </button>
                    </form>
                </div>

                <div style={styles.imagePreviews}>
                    <div style={styles.imagePreview}>
                        <h6>Old Image Preview</h6>
                        {oldImage && (
                            <img
                                src={oldImage}
                                alt="Old Journal"
                                style={styles.previewImage}
                            />
                        )}
                    </div>

                    <div style={styles.imagePreview}>
                        <h6>New Image Preview</h6>
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="New Journal Image"
                                style={styles.previewImage}
                            />
                        ) : (
                            <p>No new image selected!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '800px',
        width: '100%',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    imagePreviews: {
        marginTop: '20px',
        display: 'flex',
        gap: '20px',
    },
    imagePreview: {
        flex: '1',
    },
    previewImage: {
        width: '100%',
        borderRadius: '8px',
    },
    loading: {
        textAlign: 'center',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
    },
};

export default EditJournal;
