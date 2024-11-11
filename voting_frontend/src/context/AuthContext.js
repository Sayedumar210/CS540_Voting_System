import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );

  let [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null
  );

  let [user, setUser] = useState(null);

  let [firstLoad, setFirstLoad] = useState(true);

  let navigate = useNavigate();

  let handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/userauth/login/", {
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
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      getUserDetails();
      navigate("/dashboard");
    } else {
      alert(data.detail);
    }
  };

  let handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/userauth/signup/", {
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
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      getUserDetails();
    } else {
      alert(data.detail);
    }
  };

  let getUserDetails = async () => {
    const response = await fetch("http://localhost:8000/userauth/getuser/", {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.stattus === 200) {
      setUser(data);
    } else {
      alert(data.detail);
    }
  };

  let updateToken = async () => {
    let response = await fetch("http://localhost:8000/userauth/token-refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    }
    else {
      alert(data.detail)
    }

    if (firstLoad) {
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    if (firstLoad) {
      updateToken();
    }
    let fourteenMinutes = 1000 * 60 * 14;
    let interval = setInterval(()=>{
      if(refreshToken){
        updateToken()
      }
    }, fourteenMinutes)
    return () => clearInterval(interval)
  })

  let contextData = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
    handleLogin: handleLogin,
    handleSignUp: handleSignUp,
    getUserDetails: getUserDetails,
  };

  return (
    <AuthContext.Provider value={contextData}>{firstLoad ? null : children}</AuthContext.Provider>
  );
};
