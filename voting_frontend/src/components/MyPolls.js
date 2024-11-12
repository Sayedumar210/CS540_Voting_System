import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';
import AuthContext from '../context/AuthContext';
import BASE_URL from '../BaseURL'

const MyPolls = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);

  let { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`${BASE_URL}/userauth/getuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setUser(data);
      } else {
        alert(data.detail);
        handleLogout();
      }
    };

    const fetchPolls = async () => {
      const response = await fetch(`${BASE_URL}/polls/mypolls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        setPolls(data)
      } else {
        alert(data.detail);
        handleLogout();
      }
    };

    fetchUserDetails();
    fetchPolls();
  }, [handleLogout]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/createpoll">Create Poll</Link>
          </li>
          <li>
            <Link to='/dashboard'> Dashboard</Link>
          </li>
        </ul>
        <div className="navbar-user">
          <span>
            {user.first_name} {user.last_name}
          </span>
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="polls-list-container">
        <h3>My Polls</h3>
        <ul className="polls-list">
          {polls.map((poll, index) => (
            <li key={index}>
              {poll.question}
              <button
                className="vote-button"
                onClick={() => navigate(`/mypoll/${poll.id}`)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default MyPolls;
