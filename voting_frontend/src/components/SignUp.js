import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import AuthContext from '../context/AuthContext';

const SignUp = () => {
  let {handleSignUp} = useContext(AuthContext);

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <input
          type="text"
          placeholder="First Name"
          name='first_name'
          className="auth-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          name='last_name'
          className="auth-input"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          name='dob'
          className="auth-input"
        />
        <input
          type="email"
          placeholder="Email"
          name='email'
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          name='password'
          className="auth-input"
        />
        <button type="submit" className="btn-secondary">
          Sign Up
        </button>
      </form>
      <Link to='/'>
      <button className="btn-back">
        Back to Home
      </button></Link>
    </div>
  );
};

export default SignUp;
