import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi } from '../apis/Api';
import '../css/regstyle.css';

const Register = () => {
  // Step 1: Creating state variables
  const [fullname, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Step 2: Create functions for changing state variables
  const changeFullName = e => {
    setFullName(e.target.value);
  };
  const changeUserName = e => {
    setUserName(e.target.value);
  };
  const changeEmail = e => {
    setEmail(e.target.value);
  };
  const changePassword = e => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  // Handle after clicking the submit button
  const handleSubmit = e => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }

    // Step 1: Check data in console
    console.log(fullname, username, email, password);

    // Creating JSON data (fieldname: values name)
    const data = {
      fullName: fullname,
      userName: username,
      email: email,
      password: password,
    };

    // Step 2: Send data to backend
    registerApi(data)
      .then(res => {
        console.log(res.data);
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate('/login');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Internal Server Error');
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Register Now</h1>
        <p>Register now to start your journey</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={changeFullName}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={changeUserName}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={changeEmail}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={changePassword}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Sign In</a></p>
      </div>
    </div>
  );
};

export default Register;
