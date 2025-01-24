import React from 'react';

const Dashboard = ({ userName }) => {
  return (
    <section id="dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <p>
        Hello, <span id="user-name">{userName}</span>! Here's an overview of your VolunMate
        activity.
      </p>
      <div className="dashboard-container">
        <div className="dashboard-item">
          <h3>Your Profile</h3>
          <p>View and update your personal information.</p>
          <button onClick={() => alert('Profile section coming soon!')}>Go to Profile</button>
        </div>
        <div className="dashboard-item">
          <h3>Upcoming Opportunities</h3>
          <p>Check out the latest volunteering opportunities near you.</p>
          <button onClick={() => alert('Opportunities section coming soon!')}>View Opportunities</button>
        </div>
        <div className="dashboard-item">
          <h3>Progress Tracker</h3>
          <p>Monitor your contributions and achievements.</p>
          <button onClick={() => alert('Progress tracker coming soon!')}>View Progress</button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
