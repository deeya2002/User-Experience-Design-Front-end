import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../apis/Api';
import '../css/loginstyle.css';

const LoginForm = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();

  const changeEmail = e => {
    setEmail (e.target.value);
  };

  const changePassword = e => {
    setPassword (e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault ();

    const data = {
      email: email,
      password: password,
    };

    loginApi (data)
      .then (res => {
        if (res.data.success === false) {
          toast.error (res.data.message);
        } else {
          toast.success (res.data.message);
          localStorage.setItem ('token', res.data.token);
          const convertedJson = JSON.stringify (res.data.userData);
          localStorage.setItem ('user', convertedJson);
          navigate ('/home');
        }
      })
      .catch (err => {
        console.log (err);
        toast.error ('Server Error');
      });
  };
  return (
    <div>
      <div className="heading">
        <h1>Welcome <br />Back!</h1>
        <p>Log In to your TravelLog account to see your <br />travel blogs.</p>
      </div>
      <div className="container">
        <div className="form-container">
          <h1>Sign In</h1>
          <p>Welcome Back! Please Sign in to your account</p>
          <form onSubmit={handleSubmit} >
            <div className="input-group">
              <label htmlFor="email">Email or Username</label>
              <input type="text" id="email"   name="email" 
              onChange={changeEmail} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" 
               onChange={changePassword} required />
            </div>
            <div className="checkbox-container">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <Link to="/sendemail">Forgot password?</Link>
            <button  type="submit" onClick={handleSubmit}>Log In</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
