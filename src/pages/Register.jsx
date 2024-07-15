import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi } from '../apis/Api';
import '../css/regstyle.css';

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      fullname: fullname,
      userName: userName,
      email: email,
      password: password,
    };

    registerApi(data)
      .then(res => {
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
    <div className="register-background">
      <div className="form-container">
        <h1>Register Now</h1>
        <p>Register now to start your journey</p>

        <div className="input-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={changeFullName}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName.toLowerCase().replace(/ /g, "")}
            onChange={changeUserName}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="emaill">Email</label>
          <input
            type="text"
            id="emaill"
            name="email"
            value={email.toLowerCase().replace(/ /g, "")}
            onChange={changeEmail}
            placeholder="Email"
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
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeConfirmPassword}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
