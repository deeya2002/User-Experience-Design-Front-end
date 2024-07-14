import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../apis/Api';
import '../css/loginstyle.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeEmail = e => {
    setEmail(e.target.value);
  };

  const changePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then(res => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem('user', convertedJson);
          navigate('/home');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Server Error');
      });
  };

  return (
    <div className="login-form-background">
      <div className="heading">
        <h1>Welcome <br />Back!</h1>
        <p>Log In to your TravelLog account to see your <br />travel blogs.</p>
      </div>
      <div className="form-container">
        <h1>Sign In</h1>
        <p>Welcome Back! Please Sign in to your account</p>
        <div className="input-group">
          <label htmlFor="email">Email </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={changeEmail}
            required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changePassword} required />
        </div>
        <div className="checkbox-container">
        </div>
        <Link to="/sendemail">Forgot password?</Link>
        <button onClick={handleSubmit} type="submit">Log In</button>
        <p>Don't have an account? <Link to="/register">Register now</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
