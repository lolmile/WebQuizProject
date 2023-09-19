import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom"; // Import useParams

function WaitingRoom({ username }) {
  const { quizId } = useParams(); // Extract quizId from URL parameter
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // Emit the 'JoinQuiz' event with the extracted quiz ID and username
    socket.emit("JoinQuiz", { quizId, username });

    // Listen for the server's response
    socket.on("JoinedQuiz", ({ quizId }) => {
      // Successfully joined the quiz, you can redirect or perform any other actions here
      console.log(`Joined Quiz ${quizId}`);
    });

    // Listen for player updates
    socket.on("PlayerList", ({ players }) => {
      // Update the list of players in the waiting room
      setPlayers(players);
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
