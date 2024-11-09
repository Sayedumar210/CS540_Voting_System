import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';  // Shared CSS for Login/Signup forms

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add login logic here
    const response = await fetch('http://localhost:8000/userauth/login/', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const data = await response.json();
    console.log(data)

    if (response.ok) {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setError(null);
    } else {
      setError(data.detail);
    }
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

 