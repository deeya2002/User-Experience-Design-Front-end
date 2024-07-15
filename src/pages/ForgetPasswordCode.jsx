import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyCodeApi } from '../apis/Api';
import '../css/codestyle.css';

const ForgotPasswordCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state && location.state.User_email;

  const handleChangeCode = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();

    const data = {
      resetCode: verificationCode,
      email: userEmail,
    };

    verifyCodeApi(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/resetpassword', { state: { User_email: userEmail } });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Server Error');
      });
  };

  return (
    <div className="verify-email-background">
    <div className="verify-screen">
      <h1>Check Your Email</h1>
      <p>
        We have sent a resent link to your email. <br />
        Please enter the 4-digit code mentioned in the mail.
      </p>
      <form onSubmit={handleVerifyCode} id="vgt">
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Enter Verification code"
          value={verificationCode}
          onChange={handleChangeCode}
        />
        <br />

      </form>
      <br />
      <button type="submit" id="verify" onClick={handleVerifyCode}>
        Verify
      </button>
      <div className="resend_link">
        Didn't get a code? <a href="/sendemail">Click to resend</a>
      </div>
    </div>
    </div>
  );
};

export default ForgotPasswordCode;
