import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../css/loginstyle.css';
import { login } from '../redux/actions/authActions';

const LoginForm = () => {
  const initialState = { email: "", password: "" };
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      navigate("/home");
    }
  }, [auth.token, navigate]);

  const { email, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
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
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email </label>
              <input type="text" id="email" name="email" value={email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
            </div>
            <div className="checkbox-container">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <Link to="/sendemail">Forgot password?</Link>
            <button type="submit">Log In</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
