import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';
import AuthContext from '../context/AuthContext';
import BASE_URL from '../BaseURL';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [privatePolls, setPrivatePolls] = useState([]);
  const [publicPolls, setPublicPolls] = useState([]);
  const { handleLogout } = useContext(AuthContext);

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
      const response = await fetch(`${BASE_URL}/polls/getpolls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        const priPolls = data.filter(poll => poll.private);
        const pubPolls = data.filter(poll => !poll.private);

        setPrivatePolls(priPolls);
        setPublicPolls(pubPolls);
      } else {
        alert(data.detail);
        handleLogout();
      }
    };

    fetchUserDetails();
    fetchPolls();
  }, [handleLogout]); // Remove publicPolls from dependencies

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
            {user.first_name} {user.last_name} | {user.email}
          </span>
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="polls-list-container">
        <h3>Invited Polls</h3>
        <ul className="polls-list">
          {privatePolls.map((poll) => (
            <li key={poll.id}>
              {poll.question}
              <button
                className="vote-button"
                onClick={() => navigate(`/poll/${poll.id}`)}
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
          {publicPolls.map((poll) => (
            <li key={poll.id}>
              {poll.question}
              <button
                className="vote-button"
                onClick={() => navigate(`/poll/${poll.id}`)}
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
