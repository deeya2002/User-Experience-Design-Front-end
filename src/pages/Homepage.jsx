import React, { useState } from 'react';
import searchIcon from '../assets/icon/search.png'; // Add your image path here
import '../css/homestyle.css'
import { getDataApi } from "../apis/fetchDataApi";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import LoadIcon from "../assets/images/loading.gif";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Travel Journal</h1>
          <a href="#journals" className="learn-more-button">Explore Now!</a>
        </div>
      </header>
      <section id="journals" className="journals-section">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search your journals..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img 
            src={searchIcon} 
            alt="Search" 
            className="search-icon" 
            onClick={handleSearch}
          />
        </div>
        {load && <img src={LoadIcon} alt="Loading..." className="loading-icon" />}
        <div className="search-results">
          {search && users.length > 0 && users.map((user) => (
            <UserCard key={user._id} user={user} handleClose={handleClose} />
          ))}
        </div>
        <h2>Your Journals</h2>
        <div className="journal-list">
          <Journal title="Journal Title 1" description="Short description of the journal entry..." imageUrl="path_to_image1.jpg" />
          <Journal title="Journal Title 2" description="Short description of the journal entry..." imageUrl="path_to_image2.jpg" />
          <Journal title="Journal Title 3" description="Short description of the journal entry..." imageUrl="path_to_image3.jpg" />
          {/* Add more Journal components as needed */}
        </div>
      </section>
    </div>
  );
}

const Journal = ({ title, description, imageUrl }) => {
  return (
    <article className="journal">
      <img src={imageUrl} alt={title} className="journal-image" />
      <div className="journal-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default Homepage;
