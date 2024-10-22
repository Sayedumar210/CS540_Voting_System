import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';  // Shared CSS for Login/Signup forms

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <button className="btn-back" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default Login;


// second 

 