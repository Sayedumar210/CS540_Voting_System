import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://192.168.21.188:8000/userauth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      console.log(localStorage.getItem('accessToken'))
      navigate("/dashboard");
    } else {
      alert(data.detail);
    }
  };

  let handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch("http://192.168.21.188:8000/userauth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        dob: e.target.dob.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
      }),
    });
    const data = await response.json();

    if (response.status === 201) {
      localStorage.setItem("accessToken", data.tokens.access);
      navigate("/dashboard");
    } else {
      alert(data.detail);
    }
  };

  let handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  let contextData = {
    handleLogin: handleLogin,
    handleSignUp: handleSignUp,
    handleLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
