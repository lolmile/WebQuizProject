import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import io, { Socket } from "socket.io-client";
import { SocketContext } from "./SocketIO/SocketContext";

function JoinQuiz() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Initialize useHistory
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  
  const handleJoinQuiz = () => {
    // Check for empty inputs
    if (!roomId || !username) {
      setErrorMessage("Please enter both a Room ID and a Username.");
      //wait 3 seconds and then remove the error message
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    socket.emit("ValidateInputs", { quizId: roomId, username}, (data) => {
      if (data.error) {
        setErrorMessage(data.msg);
        //wait 3 seconds and then remove the error message
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        navigate(`/waiting-room/${roomId}`, {state: { username } }); // Navigate to the WaitingRoom with the quiz ID and username as URL parameters 
      }
    });
  };

    return (
      <>
        <div className="top-left-emoji">
          <Link to="/" className="link-no-style">
            <h1>Back</h1>
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
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="usernameInput"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-lg btn-success mt-3 w-50"
                    onClick={handleJoinQuiz}
                  >
                    Join
                  </button>
                </div>
              </form>
              {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  export default JoinQuiz;
