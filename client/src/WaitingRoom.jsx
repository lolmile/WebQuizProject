import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // Import useParams
import { SocketContext } from "./SocketIO/SocketContext.js";


function WaitingRoom() {
  const { quizId } = useParams(); // Extract quizId from URL parameter
  const { username } = useLocation().state; // Extract username from location state
  const [players, setPlayers] = useState([]);
  const socket = useContext(SocketContext);

  // Use the navigate function from React Router to programmatically navigate
  const navigate = useNavigate();

  useEffect(() => {
    // join quiz
    try {
      socket.emit("JoinQuiz", { quizId, username });
    }
    catch {
      navigate('/');
      return;
    }

    socket.on("UpdatePlayers", (data) => {
      setPlayers(data.players);
    });

    socket.on("GameStarted", () => {
      // Redirect all players to the /play/:quizId route when the game starts
      navigate(`/play/${quizId}`);
    });
  }, [quizId, username, navigate, socket]);

  const handleStartGame = () => {
    socket.emit("StartGame", { quizId });
  };

  return (
    <div className="text-center">
      <h1>Waiting Room</h1>
      <p>Room ID: {quizId}</p>
      <h2>Players:</h2>
        {players.map((player) => (
          <p className="mb-0" key={player.socketId}>{player.username}</p>
        ))}
      <p>Waiting for the quiz to start...</p>
      {/* Conditionally render the "Start Game" button */}
      {username === "Master" && (
        <button className="btn btn-success" onClick={() => handleStartGame()}>
          Start Game
        </button>
      )}
    </div>
  );
}

export default WaitingRoom;
