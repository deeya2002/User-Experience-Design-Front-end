import { useSelector,useDispatch, } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png'; 
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handlePassword = () => {
    navigate("/sendemail");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ fontFamily: "Times New Roman", fontSize: "18px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-dark fw-bold" to="/">
          <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
          <span style={{ fontWeight: "bold" }}>Travel Log</span>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
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
                Journal
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {auth.user ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ minWidth: "150px" }}
                >
                  Welcome, {auth.user.fullname}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      onClick={handleProfile}
                      className="dropdown-item"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/notification">
                      Notification
                    </Link>
                  </li>
                  <li>
                    <button
                    onClick={() => dispatch(logout())}
                      className="dropdown-item"

                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-danger me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
