import React, {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {registerApi} from '../apis/Api';
import '../css/regstyle.css';

const Register = () => {
  //step: 1 creating a state variable
  const [fullname, setFullName] = useState ('');
  const [username, setUserName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();

  // step 2 : Create a function for changing the state variable
  const changeFullName = e => {
    setFullName (e.target.value);
  };
  const changeUserName = e => {
    setUserName (e.target.value);
  };
  const changeEmail = e => {
    setEmail (e.target.value);
  };
  const changePassword = e => {
    setPassword (e.target.value);
  };

  //handle after clicking the submit button
  const handleSubmit = e => {
    e.preventDefault ();
    //step1: check data in console
    console.log (fullname, username, email, password);

    // Creating json data (fieldname: values name)
    const data = {
      fullName: fullname,
      userName: username,
      email: email,
      password: password,
    };

    //Step: 2 Send data to backend
    registerApi (data)
      .then (res => {
        console.log (res.data);
        if (res.data.success === true) {
          toast.success (res.data.message);
          navigate ('/login');
        } else {
          toast.error (res.data.message);
        }
      })
      .catch (err => {
        console.log (err);
        toast.error ('Internal Server Error');
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
              onChange={changeUserName}
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
              onChange={changeEmail}
              placeholder={alert.email ? `${alert.email}` : "Email"}
              style={{ background: `${alert.email ? "#fa8e96" : ""}` }}
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
              type= "password"
              id="confirm-password"
              name="confirmPassword"
              onChange={changePassword}
              placeholder= "Confirm Password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
