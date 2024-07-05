import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/regstyle.css';
import { register } from "../redux/actions/authActions.js";

const Register = () => {
  const initialState = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showpass, setShowpass] = useState(false);
  const [showcfpass, setShowcfpass] = useState(false);
  const [userData, setuserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword } = userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);

  useEffect(() => {
    if (alert) {
      for (const key in alert) {
        if (alert[key]) {
          toast.error(alert[key]);
        }
      }
    }
  }, [alert]);

  useEffect(() => {
    if (auth.success) {
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        history("/login");
      }, 2000);
    }
  }, [auth.success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="container">
      <ToastContainer />
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
              onChange={handleChange}
              placeholder={alert.fullname ? `${alert.fullname}` : "Fullname"}
              style={{ background: `${alert.fullname ? "#fa8e96" : ""}` }}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username.toLowerCase().replace(/ /g, "")}
              onChange={handleChange}
              placeholder={alert.username ? `${alert.username}` : "Username"}
              style={{ background: `${alert.username ? "#fa8e96" : ""}` }}
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
              onChange={handleChange}
              placeholder={alert.email ? `${alert.email}` : "Email"}
              style={{ background: `${alert.email ? "#fa8e96" : ""}` }}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type={showpass ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder={alert.password ? `${alert.password}` : "Password"}
              style={{ background: `${alert.password ? "#fa8e96" : ""}` }}
              required
            />
            <small
              className="register-showpass hover-pointer"
              onClick={() => setShowpass(!showpass)}
            >
              {showpass ? "Hide" : "Show"}
            </small>
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type={showcfpass ? "text" : "password"}
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : "Confirm Password"}
              style={{ background: `${alert.confirmPassword ? "#fa8e96" : ""}` }}
              required
            />
            <small
              className="register-showcfpass hover-pointer"
              onClick={() => setShowcfpass(!showcfpass)}
            >
              {showcfpass ? "Hide" : "Show"}
            </small>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
