import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';  // Importing the CSS file



const Home = () => {
  const [CurrentUser, setCurrentUser] = useState();
  
  return (
    <div className="home-container">
      <h1 className="home-title animated-title">Welcome to the Voting App</h1>
      <div className="home-buttons">
        <Link to="/login" className="btn-primary animated-button">
          Login
        </Link>
        <Link to="/signup" className="btn-secondary animated-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
