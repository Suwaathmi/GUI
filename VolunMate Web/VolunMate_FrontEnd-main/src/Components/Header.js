import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./Header.css"; 

const Header = () => {
  const navigate = useNavigate();

  
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  
  const home = role === "volunteer" ? "/dashboard" : "/organization";

  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5150/api/auth/logout", {
        method: "POST",
        headers: {
          accept: "*/*",
        },
      });

      if (!response.ok) throw new Error("Logout failed");

      
      localStorage.removeItem("userName");
      localStorage.removeItem("role");

      
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const handleHomeClick = (e) => {
    e.preventDefault();
    userName ? navigate(home) : navigate("/");
  };

  return (
    <header className="header">
      <div className="logo-container" onClick={handleHomeClick}>
        <img src={logo} alt="VolunMate Logo" className="logo-image" />
        <h1 className="logo-text">VolunMate</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#home" onClick={handleHomeClick} className="nav-link">
              Home
            </a>
          </li>
          
          {!userName && (
            <>
              <li className="nav-item">
                <a
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="nav-link"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#signup"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                  className="nav-link"
                >
                  SignUp
                </a>
              </li>
            </>
          )}
          
          {userName && (
            <li className="nav-item">
              <a href="#logout" onClick={handleLogout} className="nav-link">
                LogOut
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;