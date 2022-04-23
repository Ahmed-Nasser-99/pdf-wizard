import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isUser, setUser] = React.useState(
    localStorage.getItem("userId") ? true : false
  );
  const [navBarToggled, setNavBarToggled] = React.useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setNavBarToggled(!navBarToggled);

    if (navBarToggled === true) {
      setTimeout(() => {
        const togglerButton = document.getElementById("navBarToggler");
        togglerButton!.setAttribute("aria-expanded", "false");
        const togglerDiv = document.getElementById("navbarSupportedContent");
        togglerDiv!.className = "navbar-collapse collapse";
        clearTimeout();
      }, 500);
    }
  };

  useEffect(() => {
    localStorage.getItem("userId") ? setUser(true) : setUser(false);
  }, [isUser, navigate, setUser]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 border ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          PDF Wizard
        </Link>
        <button
          aria-expanded="false"
          className="navbar-toggler"
          onClick={toggleNavbar}
          id="navBarToggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            </li>
              <li className="nav-item">
              {isUser && (
                <Link className="nav-link " to="/converter">
                  Convert File
                </Link>
              )}
            </li>
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
      </div>
    </nav>
  );
}
