import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import LoggedinRoute from "./utils/LoggedinRoute";
import CreatePoll from "./components/CreatePoll";
import PollPage from "./components/PollPage"; // Ensure PollPage is correctly imported
import MyPolls from "./components/MyPolls";
import MyPollPage from "./components/MyPollPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<LoggedinRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createpoll" element={<CreatePoll />} />
            <Route path="/mypolls" element={<MyPolls />} />
            <Route path="/poll/:poll_id" element={<PollPage />} /> {/* Ensure this path matches exactly */}
            <Route path="/mypoll/:poll_id" element={<MyPollPage />} /> {/* Ensure this path matches exactly */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
