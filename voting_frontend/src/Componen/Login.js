import React, { useContext, useState } from "react";
import "./Auth.css"; // Shared CSS for Login/Signup forms
import AuthContext from "../context/AuthContext";

const Login = () => {
  let {handleLogin} = useContext(AuthContext)
  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <Link to="/">
        <button className="btn-back">Back to Home</button>
      </Link>
    </div>
  );
};

export default Login;
