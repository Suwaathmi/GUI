import React, { useEffect, useState } from "react";
import "./RegisteredEvents.css"; 
const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("id");

    if (!userRole || !userId) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5150/api/Event/registered?userRole=${userRole}&userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  const today = new Date();
const role=localStorage.getItem("role");
  
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const completedEvents = events.filter((event) => new Date(event.date) < today);

  if (loading) return <p className="loading">Loading events...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="registered-events">


      {events.length === 0 ? (
        <p className="no-events">No events registered.</p>
      ) : (
        <>
          
          <h3 className="upcoming-header">Upcoming Events</h3>
          {upcomingEvents.length === 0 ? (
            <p className="no-events">No upcoming events.</p>
          ) : (
            <ul className="event-list">
              {upcomingEvents.map((event) => (
                <li key={event.title} className="event-card">
                  <h3 className="event-title">{event.title}</h3>
                 
                  <p>{event.name}</p>
                  <p className="event-description">{event.description}</p>
                  <p className="event-date">
                    <strong>Date:</strong> {new Date(event.date).toDateString()}
                  </p>
                  <p className="event-location">
                    <strong>Location:</strong> {event.location}
                  </p>
                </li>
              ))}
            </ul>
          )}

          
          <h3 className="completed-header">Completed Events</h3>
          {completedEvents.length === 0 ? (
            <p className="no-events">No completed events.</p>
          ) : (
            <ul className="event-list">
              {completedEvents.map((event) => (
                <li key={event.title} className="event-card completed">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <p className="event-date">
                    <strong>Date:</strong> {new Date(event.date).toDateString()}
                  </p>
                  <p className="event-location">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="event-status">Completed</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default RegisteredEvents;