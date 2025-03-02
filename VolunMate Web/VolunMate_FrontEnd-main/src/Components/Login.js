import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5150/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, passwordHash: password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);

      
      navigate(data.role === "volunteer" ? "/dashboard" : "/organization");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="switch">
          <p>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className="signup-link"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;