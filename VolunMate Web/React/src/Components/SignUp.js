import React from 'react';

const SignUp = ({ handleNavigation }) => {
  return (
    <section id="signup">
      <h2>Sign Up</h2>
      <div className="form-container">
        <form>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <label htmlFor="role">Are you a Volunteer or Organization?</label>
          <select id="role" name="role">
            <option value="volunteer">Volunteer</option>
            <option value="organization">Organization</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
        <div className="switch">
          <p>
            Already have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('login'); }}>Login here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
