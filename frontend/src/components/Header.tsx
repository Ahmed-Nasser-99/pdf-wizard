import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isUser, setUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("userId") ? setUser(true) : setUser(false);
  }, [isUser, navigate, setUser]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 border ">
      <Link className="navbar-brand" to="/">
        PDF Wizard
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link " to="/">
              Home{" "}
            </Link>
          </li>
          <li className="nav-item">
            {!isUser && (
              <Link className="nav-link " to="/login">
                login
              </Link>
            )}
          </li>
          <li className="nav-item">
            {!isUser && (
              <Link className="nav-link " to="/register">
                register
              </Link>
            )}
          </li>
          <li className="nav-item">
            {isUser && (
              <Link className="nav-link " to="/myfiles">
                My Lib
              </Link>
            )}
          </li>{" "}
          <li className="nav-item">
            {isUser && (
              <Link className="nav-link " to="/profile">
                My Profile
              </Link>
            )}
          </li>{" "}
          <li className="nav-item">
            {isUser && (
              <Link
                className="nav-link ml-auto"
                to="#"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
