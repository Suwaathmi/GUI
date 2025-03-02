// import React, { useState } from "react";
// import Header from "./Components/Header";
// import Intro from "./Components/Intro";
// import Login from "./Components/Login";
// import SignUp from "./Components/SignUp";
// import Dashboard from "./Components/Dashboard";
// import UserProfile from "./Components/UserProfile";
// import Footer from "./Components/Footer";
// import EventScreen from "./Components/EventScreen";
// import "./App.css";

// const App = () => {
//   const [currentPage, setCurrentPage] = useState("intro");
//   const [userName, setUserName] = useState("User");

//   const handleNavigation = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <Header handleNavigation={handleNavigation} />

//       {currentPage === "intro" && <Intro handleNavigation={handleNavigation} />}
//       {currentPage === "login" && (
//         <Login handleNavigation={handleNavigation} setUserName={setUserName} />
//       )}
//       {currentPage === "signup" && (
//         <SignUp handleNavigation={handleNavigation} setUserName={setUserName} />
//       )}
//       {currentPage === "dashboard" && (
//         <Dashboard userName={userName} handleNavigation={handleNavigation} />
//       )}
//       {currentPage === "userprofile" && <UserProfile handleNavigation={handleNavigation} />}
//       {currentPage === "events" && <EventScreen handleNavigation={handleNavigation} />}
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Intro from "./Components/Intro";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import UserProfile from "./Components/UserProfile";
import Footer from "./Components/Footer";
import EventScreen from "./Components/EventScreen";
import OrganizationDash from "./Components/OrganizationDash";
import UserEventsScreen from "./Components/UserEventScreen"
import RegisteredEvents from './Components/RegisteredEvents'
import "./App.css";

const App = () => {

  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/events" element={<EventScreen />} />
        <Route path="/organization" element={<OrganizationDash />}/>
        <Route path="/userevents" element={<UserEventsScreen />}/>
        <Route path="/registeredeve" element={<RegisteredEvents />}/>



      </Routes>
      <Footer />
    </Router>
  );
};

export default App; 
