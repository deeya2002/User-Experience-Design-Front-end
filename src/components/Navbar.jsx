import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ size, setShow }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

   // Get user data from local storage
   const user = JSON.parse(localStorage?.getItem("user")) || null;

  const handlePassword = () => {
    navigate("/sendemail");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f8f9fa', fontFamily: 'Times New Roman' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-danger fw-bold" to="/">
          <img
            src="/assets/images/logo.png" // Correct path
            alt="Logo"
            style={{ width: '60px', height: '60px', marginRight: '1px' }} // Adjust size and margin as needed
          />
          <span style={{ color: 'black' }}>Travel Log</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/journal">
                Journals
              </Link>
            </li>
          </ul>
          <div className="ms-2">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ minWidth: '190px' }} // Adjust width here
                >
                  Welcome, {user.fullName}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      onClick={handleProfile}
                      className="dropdown-item"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handlePassword}
                      className="dropdown-item"
                      to="/sendemail"
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item"
                      to="/logout"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="btn btn-outline-danger" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success ms-2" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
