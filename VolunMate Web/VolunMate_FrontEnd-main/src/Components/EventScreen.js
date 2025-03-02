import React, { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./eventService";
import "./EventScreen.css"; 

export default function EventScreen() {
  const id = localStorage.getItem("id");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizerId: id,
  });
  const [editingId, setEditingId] = useState(null);

  
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateEvent(editingId, event);
    } else {
      await createEvent(event);
    }
    resetForm();
    loadEvents();
  };

  const handleEdit = (eventData) => {
    setEditingId(eventData.id);
    setEvent(eventData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  const resetForm = () => {
    setEvent({ title: "", description: "", date: "", location: "" });
    setEditingId(null);
  };

  return (
    <div className="event-screen">
      <h2 className="event-header">{editingId ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            placeholder="Enter event location"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {editingId ? "Update Event" : "Add Event"}
        </button>
      </form>

      <h2 className="event-list-header">Event List</h2>
      <div className="event-table-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.title}</td>
                <td>{new Date(ev.date).toLocaleDateString()}</td>
                <td>{ev.location}</td>
                <td>
                  <button
                    onClick={() => handleEdit(ev)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}