import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // Import a CSS file for styling

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5150/api/auth/signup", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          passwordHash: password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

      // On successful signup
      setSuccess("Signup successful! Redirecting to login...");
      setError("");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <h2 className="signup-header">Sign Up</h2>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Are you a Volunteer or Organization?</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="volunteer">Volunteer</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="switch">
          <p>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="login-link"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;