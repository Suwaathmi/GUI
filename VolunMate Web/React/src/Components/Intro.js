import React from 'react';

const Intro = ({ handleNavigation }) => {
  return (
    <section id="intro">
      <h2>Welcome to VolunMate!</h2>
      <p>
        VolunMate is a platform designed to connect passionate volunteers with organizations
        in need of help. Whether you are looking to contribute your time or you are an
        organization seeking support, VolunMate makes it easier to find the right opportunities
        and make a meaningful impact.
      </p>
      <button onClick={() => handleNavigation('login')}>Let's Go</button>
    </section>
  );
};

export default Intro;
