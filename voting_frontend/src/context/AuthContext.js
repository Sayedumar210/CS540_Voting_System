import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() => {
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });

  let [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/userauth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setAuthTokens(data);
      localStorage.setItem("authTokens", data);
      <Redirect to="/dashboard" />;
    } else {
      alert(data.detail);
    }
  };

  let contextData = {
    authTokens: authTokens,
    handleLogin: handleLogin,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
