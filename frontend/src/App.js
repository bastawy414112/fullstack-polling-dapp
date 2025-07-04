import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import VotingPanel from "./components/VotingPanel";
import "./components/DarkMood.css"; // استيراد ملف CSS للدارك مود

function App() {
  return (
    <div className="dark-mode">
      <Router>
        <nav className="nav-bar">
          <Link to="/admin" className="nav-link">
            Admin Panel
          </Link>{" "}
          |{" "}
          <Link to="/voting" className="nav-link">
            Voting Panel
          </Link>
        </nav>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/voting" element={<VotingPanel />} />
          <Route path="/" element={<h1>Welcome to the Election DApp</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
