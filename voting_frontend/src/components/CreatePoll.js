import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CreatePoll.css";
import AuthContext from "../context/AuthContext";

const CreatePoll = () => {
  const { handleLogout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryTime, setExpiryTime] = useState('');

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionsChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleAddInvitedUser = () => {
    setInvitedUsers([...invitedUsers, ""]);
  };

  const handleInvitedUserChange = (index, value) => {
    const newInvitedUsers = [...invitedUsers];
    newInvitedUsers[index] = value;
    setInvitedUsers(newInvitedUsers);
  };

  const handleRemoveInvitedUser = (index) => {
    const newInvitedUsers = invitedUsers.filter((_, i) => i !== index);
    setInvitedUsers(newInvitedUsers);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("http://192.168.21.188:8000/userauth/getuser", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
    fetchUserDetails();
  }, [handleLogout, navigate]);

  const handleSubmit = async () => {
    const expiryDateTime = `${expiryDate}T${expiryTime}:00`;
    const response = await fetch("http://192.168.21.188:8000/polls/createpoll/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({poll:{
        question: question,
        private: isPrivate,
        expiry_time: expiryDateTime,
        invited_users: invitedUsers.filter(user => user.trim() !== ""),
        options: options.filter(option => option.trim() !== ""),
      }}),
    });
    let data = await response.json();

    if (data.users_not_found) {
      alert(`Couldn't find the following users:\n${data.users_not_found.join(", ")}`);
    }

    if (response.status === 201) {
      alert("Poll created successfully");
      navigate("/dashboard");
    } else {
      alert(data.detail);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-poll-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/mypolls"> My Polls</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
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
      <h2>Create a New Poll</h2>

      <div className="form-group">
        <label>Poll Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your poll question here"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} className="poll-option">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionsChange(index, e.target.value)}
              placeholder="Enter Option"
              className="input-field"
            />
            <button type="button" onClick={() => handleRemoveOption(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="expiry-date">Expiry Date:</label>
        <input
          type="date"
          id="expiry-date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="expiry-time">Expiry Time:</label>
        <input
          type="time"
          id="expiry-time"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <div className="form-group">
        <label>Make this Poll Private:</label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
      </div>

      {isPrivate && (
        <div className="form-group">
          <label>Invited Users:</label>
          {invitedUsers.map((email, index) => (
            <div key={index} className="invited-user">
              <input
                type="email"
                value={email}
                onChange={(e) => handleInvitedUserChange(index, e.target.value)}
                placeholder="Enter email"
                className="input-field"
              />
              <button
                type="button"
                onClick={() => handleRemoveInvitedUser(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddInvitedUser}>
            Add User
          </button>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={!options.length || (isPrivate && !invitedUsers.length)}
      >
        Create Poll
      </button>
    </div>
  );
};

export default CreatePoll;
