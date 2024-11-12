import React, { useContext, useEffect, useState } from "react";
import "./MyPollPage.css";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const MyPollPage = () => {
  console.log('test')
  const { poll_id } = useParams();
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    
    const fetchPoll = async () => {
      const response = await fetch(`http://localhost:8000/polls/poll/${poll_id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setPoll(data.poll);
        setOptions(data.options);
      } else {
        alert(data.detail);
        handleLogout();
      }
    };
    fetchPoll();
  }, [poll_id, handleLogout]);

  if (!poll) {
    return <div>Loading...</div>;
  }

  let totalVotes = 0;

  for (let option in options) {
    totalVotes += option.votes;
  }

  return (
    <div className="mypoll-page-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/createpoll">Create Poll</Link>
          </li>
          <li>
            <Link to="/mypolls"> My Polls</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <div className="navbar-user">
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <h2 className="poll-question">{poll.question}</h2>
      <div className="poll-options">
        {options.map((option, index) => {
          const votePercentage =
            totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;
          return (
            <div key={index} className="poll-option">
              <span>{option.option_text}</span>
              <div className="vote-bar-container">
                <div
                  className="vote-bar"
                  style={{ width: `${votePercentage}%` }}
                ></div>
              </div>
              <span className="vote-count">{option.votes} votes</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPollPage;
