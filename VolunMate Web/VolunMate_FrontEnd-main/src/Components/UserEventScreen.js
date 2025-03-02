import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEventsScreen.css"; 

const UserEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5150/api/Event");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to load events");
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  const handleRegister = async (eventId) => {
    try {
      const volunteerId = localStorage.getItem("id");
      console.log("User id",volunteerId);
      if (!volunteerId) {
        alert("Please log in to register for events.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5150/api/Event/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, volunteerId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSuccess("Successfully registered for the event!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>

      {loading && <p className="loading">Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="events-grid">
        {events.length === 0 && !loading ? <p>No upcoming events.</p> : null}

        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
            <button className="register-btn" onClick={() => handleRegister(event.id)}>
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEventsScreen;
