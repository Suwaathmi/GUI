import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
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
        {/* Profile Card */}
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

        {/* Opportunities Card */}
        <div className="dashboard-card">
          <div className="card-content">
            <h3>Upcoming Opportunities</h3>
            <p>Check out the latest volunteering opportunities near you.</p>
          </div>
          <button
            className="card-button"
            onClick={() => navigate("/userevents")}
          >
            View Opportunities
          </button>
        </div>

        {/* Progress Tracker Card */}
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

export default Dashboard;