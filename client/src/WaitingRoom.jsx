import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom"; // Import useParams

function WaitingRoom() {
  const { quizId } = useParams(); // Extract quizId from URL parameter
  const { username } = useLocation().state; // Extract username from location state
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // join quiz
    socket.emit("JoinQuiz", { quizId, username });

    socket.on("UpdatePlayers", (data) => {
      setPlayers(data.players);
    });

   
    // Clean up the socket connection when unmounting
    return () => {
      socket.disconnect();
    };
  }, [quizId, username]);

  return (
    <div>
      <h1>Waiting Room</h1>
      <p>Room ID: {quizId}</p>
      <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li key={player.socketId}>{player.username}</li>
        ))}
      </ul>
      <p>Waiting for the quiz to start...</p>
      {/* Add additional waiting room UI here */}
    </div>
  );
}

export default WaitingRoom;
