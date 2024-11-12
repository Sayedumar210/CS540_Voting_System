import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Importing the CSS file

const Home = () => {
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
