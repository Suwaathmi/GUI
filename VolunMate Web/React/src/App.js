import React, { useState } from 'react';
import Header from './Components/Header';
import Intro from './Components/Intro';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import './App.css';
import logo from './logo.png';

const App = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [userName, setUserName] = useState('User');

  const handleNavigation = (page) => {
    if (page === 'dashboard') {
      const nameInput = document.getElementById('name');
      setUserName(nameInput?.value || 'User');
    }
    setCurrentPage(page);
  };

  return (
    <div>
      <Header handleNavigation={handleNavigation} />
      
      {currentPage === 'intro' && <Intro handleNavigation={handleNavigation} />}
      {currentPage === 'login' && <Login handleNavigation={handleNavigation} />}
      {currentPage === 'signup' && <SignUp handleNavigation={handleNavigation} />}
      {currentPage === 'dashboard' && <Dashboard userName={userName} />}
      
      <Footer />
    </div>
  );
};

export default App;
