import React, { useContext, useEffect, useState } from "react";
import "./PollPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PollPage = () => {
  const { poll_id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const {handleLogout} = useContext(AuthContext)

  useEffect(() => {
    const fetchPoll = async () => {
      const response = await fetch(`http://192.168.21.188:8000/polls/poll/${poll_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data)

      if (response.status === 200) {
        setPoll(data.poll);
        setOptions(data.options);
        console.log(options)
      } else {
        alert(data.detail);
        navigate('/dashboard')
      }
    };

    fetchPoll();
  }, [poll_id]);

  const handleVote = async () => {
    const response = await fetch("http://192.168.21.188:8000/polls/castvote/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poll_id: poll_id, option_id: selectedOption }),
      });
      
      console.log(response)
    const data = await response.json();
    alert(data.detail)
  };

  if (!poll || !options.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="poll-page-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/createpoll">Create Poll</Link>
          </li>
          <li>
            <Link to='/mypolls'> My Polls</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
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
        {options.map((option, index) => (
          <div key={index} className="poll-option">
            <input
              type="radio"
              id={option.id}
              name="poll"
              value={option.option_text}
              onChange={() => setSelectedOption(option.id)}
            />
            <label>{option.option_text}</label>
          </div>
        ))}
      </div>

      <button
        onClick={handleVote}
        disabled={!selectedOption}
        className="vote-button"
      >
        Submit Vote
      </button>
    </div>
  );
};

export default PollPage;
