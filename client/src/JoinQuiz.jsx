import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import io from "socket.io-client"; // Import socket.io-client

function JoinQuiz() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleJoinQuiz = () => {
    // Connect to the Socket.io server
    const socket = io("http://localhost:5000"); // Replace with your server's URL
    
    // Emit the 'JoinQuiz' event with the entered room ID and username
    socket.emit('JoinQuiz', { quizId: roomId, username });
    
    // Listen for the server's response
    socket.on('JoinedQuiz', ({ quizId }) => {
      // Successfully joined the quiz, you can redirect or perform any other actions here
      console.log(`Joined Quiz ${quizId}`);
      // Redirect the user to the quiz room or perform other actions
    });

    // Listen for errors
    socket.on('Error', ({ message }) => {
      setErrorMessage(message);
    });
  };

  return (
    <>
      <div className="top-left-emoji">
        <Link to="/" className="link-no-style">
          <h1>🧙🏼</h1>
        </Link>
      </div>
      <h1 className="text-center mt-3">Join Qwiz</h1>
      <div className="container">
        <div className="row mb-5"></div>
        <div className="row mb-5"></div>
        <div className="row">
          <div className="col text-center">
            <form className="d-flex flex-column align-items-center">
              <div className="form-group">
                <label htmlFor="code" className="fs-2">
                  Room ID
                </label>
                <input
                  type="text"
                  className="form-control mt-3"
                  id="roomIdInput"
                  placeholder="Enter Room ID"
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  id="usernameInput"
                  placeholder="Enter Username"
                />
                <button
                  className="btn btn-lg btn-success mt-3 w-50"
                  onClick={handleJoinQuiz}
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinQuiz;
