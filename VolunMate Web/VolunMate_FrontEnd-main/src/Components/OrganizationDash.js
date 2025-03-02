import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 

const OrganizationDash = () => {
  const navigate = useNavigate(); 
  const name = localStorage.getItem("userName");

  return (
    <section id="dashboard" className="dashboard-section">
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <p>
          Hello, <span className="user-name">{name}</span>! Here's an overview of your
          VolunMate activity.
        </p>
      </div>

      <div className="dashboard-container">
        
        <div className="dashboard-card">
          <div className="card-content">
            <h3>Your Profile</h3>
            <p>View and update your personal information.</p>
          </div>
          <button
            className="card-button"
            onClick={() => navigate("/userprofile")}
          >
            Go to Profile
          </button>
        </div>


        <div className="dashboard-card">
          <div className="card-content">
            <h3>Events</h3>
            <p>Manage upcoming events and activities.</p>
          </div>
          <button
            className="card-button"
            onClick={() => navigate("/events")}
          >
            View Events
          </button>
        </div>

        
        <div className="dashboard-card">
          <div className="card-content">
            <h3>Progress Tracker</h3>
            <p>Monitor your contributions and achievements.</p>
          </div>
          <button
            className="card-button"
            onClick={() => navigate("/registeredeve")}
          >
            View Progress
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrganizationDash;