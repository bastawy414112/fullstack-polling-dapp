import React, { useState, useEffect } from "react";
import {
  createElection,
  addCandidate,
  addVoter,
  getCandidates,
  getVoters,
  getElectionName,
  hasElectionStartedFromContract,
  startElection,
  endElection,
  hasElectionFinalizedFromContract,
  getWinner,
} from "../contract";
import { PINATA_JWT } from "../config";
import placeholderImage from "../Loading.png";
import "./AdminPanel.css"; // ✅ ربط ملف الـ CSS

const AdminPanel = () => {
  const [electionName, setElectionName] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [addElectionName, setAddElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [voterAddress, setVoterAddress] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState("");
  const [voters, setVoters] = useState([]);
  const [hasElectionStarted, setElectionStarted] = useState(false);
  const [hasElectionFinalized, setHasElectionFinalized] = useState(false);
  const [candidateImage, setCandidateImage] = useState(null);
  const [candidateImageHash, setCandidateImageHash] = useState("");
  const [mapCandidateImages, setmapCandidateImages] = useState({});

  const getFileFromIPFS = async (cid) => {
    if (!cid) return;
    const url = `https://ipfs.io/ipfs/${cid}`;
    const res = await fetch(url);
    return await res.blob();
  };

  const pinFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const request = new Request(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${PINATA_JWT}` },
        body: formData,
      }
    );
    const response = await fetch(request);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const load = async () => {
      setCandidates(await getCandidates());
      setVoters(await getVoters());
      setElectionName(await getElectionName());
      setWinnerName((await getWinner())?.name || "");
      setElectionStarted(await hasElectionStartedFromContract());
      setHasElectionFinalized(await hasElectionFinalizedFromContract());
    };
    load();
  }, []);

  useEffect(() => {
    if (candidates.length === 0) return;
    const loadImages = async () => {
      const images = {};
      for (const c of candidates) {
        const blob = await getFileFromIPFS(c.image);
        images[c.candidateAddress] = URL.createObjectURL(blob);
      }
      setmapCandidateImages(images);
    };
    loadImages();
  }, [candidates]);

  const handleCreateElection = async () => {
    await createElection(addElectionName, startDate, endDate);
    alert("Election created!");
  };

  const handleAddCandidate = async () => {
    await addCandidate(
      candidateAddress,
      candidateName,
      candidateParty,
      candidateImageHash
    );
    alert("Candidate added!");
  };

  const handleAddVoter = async () => {
    await addVoter(voterAddress, voterName, voterAge);
    alert("Voter added!");
  };

  const handleUploadToIPFS = async () => {
    const res = await pinFileToIPFS(candidateImage);
    setCandidateImageHash(res.IpfsHash);
    alert("Image uploaded!");
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="section">
        <h2>Create Election</h2>
        <input
          placeholder="Election Name"
          value={addElectionName}
          onChange={(e) => setAddElectionName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleCreateElection}>Create</button>
        {electionName && <p>Current: {electionName}</p>}
      </div>

      <div className="section">
        <h2>Manage Candidates</h2>
        <input
          placeholder="Address"
          value={candidateAddress}
          onChange={(e) => setCandidateAddress(e.target.value)}
        />
        <input
          placeholder="Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <input
          placeholder="Party"
          value={candidateParty}
          onChange={(e) => setCandidateParty(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCandidateImage(e.target.files[0])}
        />
        <button onClick={handleUploadToIPFS}>Upload Image</button>
        <button onClick={handleAddCandidate}>Add Candidate</button>

        <ul>
          {candidates.map((c) => (
            <li key={c.candidateAddress}>
              <img
                src={mapCandidateImages[c.candidateAddress] || placeholderImage}
                alt=""
              />
              {c.name} ({c.party})
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Manage Voters</h2>
        <input
          placeholder="Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <input
          placeholder="Name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
        />
        <input
          placeholder="Age"
          value={voterAge}
          onChange={(e) => setVoterAge(e.target.value)}
        />
        <button onClick={handleAddVoter}>Add Voter</button>

        <ul>
          {voters.map((v) => (
            <li key={v.voterAddress}>
              {v.name} ({v.voterAddress})
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Controls</h2>
        {!hasElectionStarted && !hasElectionFinalized && (
          <button onClick={startElection}>Start Election</button>
        )}
        {hasElectionStarted && !hasElectionFinalized && (
          <button onClick={endElection}>End Election</button>
        )}
        {winnerName && <p>Winner: {winnerName}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;
