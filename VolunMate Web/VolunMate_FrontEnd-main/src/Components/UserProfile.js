import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./UserProfile.css"; 

export default function UserProfile() {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const userID = localStorage.getItem("id");

  
  useEffect(() => {
    if (!userID) {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [userID]);


  useEffect(() => {
    if (!userID) return;

    fetch(`http://localhost:5150/api/User/${userID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile.");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
        console.log("User profile loaded successfully");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userID]);

  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleUpdate = () => {
    fetch(`http://localhost:5150/api/User/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile.");
        }
        return response.json();
      })
      .then(() => {
        alert("Profile updated successfully.");
        navigate("/dashboard"); 
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`http://localhost:5150/api/User/${userID}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete account.");
          }
          alert("Account deleted.");
          localStorage.removeItem("id"); 
          navigate("/login"); 
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  // Display loading or error messages
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-header">User Profile</h2>
      <div className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={user.role}
            disabled
            placeholder="Your role"
          />
        </div>
        <div className="form-actions">
          <button className="update-button" onClick={handleUpdate}>
            Update Profile
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}