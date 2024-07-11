import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendEmailApi } from '../apis/Api';
import '../css/sendemailstyle.css';

const SendEmail = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const changeEmail = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: email,
    };

    sendEmailApi(data)
      .then(res => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/resetcode', { state: { User_email: email } });
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('Server Error');
      });
  };

  return (
    <div className="forgot-password-screen">
      <h1>Forgot Your Password?</h1>
      <p>Enter your email address to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email or Username</label>
          <input
            onChange={changeEmail}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email or username"
            required
          />
        </div>
      </form>
      <button type="submit" id="reset" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};

export default SendEmail;
