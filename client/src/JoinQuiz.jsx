import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function JoinQuiz() {
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
