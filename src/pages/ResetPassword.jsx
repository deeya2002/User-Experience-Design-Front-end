import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../apis/Api';
import '../css/resetstyle.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state && location.state.User_email;

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await updatePasswordApi({
        email: userEmail,
        password: newPassword,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate('/login');
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  };

  return (
    <div className="password-background">
    <div className="reset-screen">
      <h2>Create a new password</h2>
      {/* <form onSubmit={handleChangePasswordSubmit} id="reset-form"> */}
        <label htmlFor="newPassword">Enter new password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handleChangePassword}
        />
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
        <br />
      {/* </form> */}
      <button type="submit" id="submit">
        Submit
      </button>
    </div>
    </div>
  );
};

export default ResetPassword;
