import React, { useState, useEffect } from 'react';
// import './App.css';

const Galleryy = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/posts') // Replace with your API URL
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="App">
      <Journal posts={posts} />
      <Gallery posts={posts} />
    </div>
  );
};

const Journal = ({ posts }) => {
  return (
    <div className="journal">
      <h2>Journal</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <p>{post.text}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="post" />}
        </div>
      ))}
    </div>
  );
};

const Gallery = ({ posts }) => {
  return (
    <div className="gallery">
      <h2>Gallery</h2>
      {posts.filter(post => post.imageUrl).map(post => (
        <img key={post.id} src={post.imageUrl} alt="gallery" />
      ))}
    </div>
  );
};

export default Galleryy;
