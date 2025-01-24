import React from 'react';

const Login = ({ handleNavigation }) => {
  return (
    <section id="login">
      <h2>Login</h2>
      <div className="form-container">
        <form>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Login</button>
        </form>
        <div className="switch">
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('signup'); }}>Sign up here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
