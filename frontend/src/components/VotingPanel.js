import React, { useEffect, useState } from "react";
import { getCandidates, voteForCandidate } from "../contract";
import "./VotingPanel.css";

const VotingPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesList = await getCandidates();
        if (Array.isArray(candidatesList) && candidatesList.length === 0) {
          //alert("No candidates found.");
        } else {
          setCandidates(candidatesList);
        }
      } catch (error) {
        console.error(error.message);
        alert("Error fetching candidates.");
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate first.");
      return;
    }
    try {
      await voteForCandidate(selectedCandidate);
      alert("Vote successfully cast!");
    } catch (error) {
      console.error(error.message);
      alert("Error casting vote.");
    }
  };

  return (
    <div className="voting-panel">
      <h1>Voting Panel</h1>

      <div className="voting-section">
        <label
          htmlFor="candidate-select"
          style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
        >
          Select a Candidate:
        </label>
        <select
          id="candidate-select"
          onChange={(e) => setSelectedCandidate(e.target.value)}
          value={selectedCandidate}
        >
          <option value="">-- Select a Candidate --</option>
          {candidates.map((candidate) => (
            <option
              key={candidate.candidateAddress}
              value={candidate.candidateAddress}
            >
              {candidate.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleVote} disabled={!selectedCandidate}>
        Vote
      </button>
    </div>
  );
};

export default VotingPanel;
