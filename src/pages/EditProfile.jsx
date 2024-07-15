import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleUserApi, updateUserProfileApi } from '../apis/Api'; // Adjust import according to your file structure

const EditProfile = () => {
    const navigate = useNavigate(); // Initialize navigate function

    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user")) || null;
    // State to manage user data
    const [fullname, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userImageFile, setUserImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load user data
    useEffect(() => {
        if (user?._id) {
            const data = { userId: user._id };
            getSingleUserApi(data)
                .then(res => {
                    const userData = res.data.singleuser;
                    setFullName(userData.fullname || '');
                    setUserName(userData.userName || '');
                    setEmail(userData.email || '');
                    setNumber(userData.number || '');
                    setLocation(userData.location || '');
                    setBio(userData.bio || '');
                    setOccupation(userData.occupation || '');
                    setUserImage(userData.userImage || ''); // Assuming userImage contains the URL or path
                })
                .catch(error => {
                    setError('Error fetching user data');
                    console.error('Error fetching user data:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user?._id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('number', number);
        formData.append('location', location);
        formData.append('bio', bio);
        formData.append('occupation', occupation);
        if (userImageFile) {
            formData.append('userImage', userImageFile);
        }

        // make an api call
        updateUserProfileApi(user?._id, formData).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                navigate('/profile');
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Internal Server Error!');
        });
    };

    // Handle image upload
    const handleImageClick = () => {
        document.getElementById('profilePicInput').click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Edit Profile</h2>
                <div style={styles.profileHeader}>
                    <div style={styles.profilePic} onClick={handleImageClick}>
                        {userImage ? (
                            <img src={userImage} alt="Profile Picture" style={styles.profileImg} />
                        ) : (
                            <div style={styles.noImageText}>No Image</div>
                        )}
                        <input type="file" id="profilePicInput" style={{ display: 'none' }} onChange={handleImageChange} />
                        <div style={styles.editIcon}>✏️</div>
                    </div>
                    <div style={styles.profileInfo}>
                        <h3>{fullname}</h3>
                        <p>{email}</p>
                    </div>
                </div>
                <form className="row g-3" style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter Full Name"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="number">Phone Number</label>
                        <input
                            type="text"
                            id="number"
                            placeholder="+977"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="bio">Bio</label>
                        <input
                            type="text"
                            id="bio"
                            placeholder="Enter Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="occupation">Occupation</label>
                        <input
                            type="text"
                            id="occupation"
                            placeholder="Enter Occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.editButton}>Save Changes</button>
                </form>
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
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    profilePic: {
        position: 'relative',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', // Background color for no image
    },
    profileImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    noImageText: {
        fontSize: '16px',
        color: '#888888',
        textAlign: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        padding: '5px',
    },
    profileInfo: {
        flexGrow: 1,
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px',
    },
    formGroup: {
        flex: '1 1 300px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc', // Corrected line
        marginTop: '5px',
    },
    editButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    }
};

export default EditProfile;
