import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [privatePolls, setPrivatePolls] = useState([]);
  const [publicPolls, setPublicPolls] = useState([]);

  let { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("http://192.168.21.188:8000/userauth/getuser", {
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
      const response = await fetch("http://192.168.21.188:8000/polls/getpolls", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        let priPolls = [];
        let pubPolls = [];
        for (let poll of data) {
          if (poll.private) {
            priPolls.push(poll);
          } else {
            pubPolls.push(poll);
          }
        }
        setPrivatePolls(priPolls);
        setPublicPolls(pubPolls);
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
            <Link to='/mypolls'> My Polls</Link>
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
        <h3>Invited Polls</h3>
        <ul className="polls-list">
          {privatePolls.map((poll, index) => (
            <li key={index}>
              {poll.question}
              <button
                className="vote-button"
                onClick={() => navigate(`/poll/${poll.id}`)} // Ensure URL is correctly formatted
              >
                Vote
              </button>
            </li>
          ))}
        </ul>
      </div>
      <br/>
      <div className="polls-list-container">
        <h3>Public Polls</h3>
        <ul className="polls-list">
          {publicPolls.map((poll, index) => (
            <li key={index}>
              {poll.question}
              <button
                className="vote-button"
                onClick={() => navigate(`/poll/${poll.id}`)} // Ensure URL is correctly formatted
              >
                Vote
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
