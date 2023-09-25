import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import spellImage from "./img/spell.png";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketIO/SocketContext.js";

function SelectCategory() {
  const [category, setCategory] = useState("Any");
  const [categoryName, setCategoryName] = useState("Any");
  const [categoryList, setCategoryList] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [timerPerQuestion, setTimePerQuestion] = useState(5);
  const [difficulty, setDifficulty] = useState("Any");

  const numList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const difficultyList = ["Any", "Easy", "Medium", "Hard"];

  const navigate = useNavigate(); // Initialize useNavigate
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        if (response.ok) {
          const data = await response.json();
          const categories = data.trivia_categories;
          setCategoryList(categories);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setCategory(category.id);
    setCategoryName(category.name);
  };

  const handleNumQuestionsSelect = (numQuestions) => {
    setNumQuestions(numQuestions);
  };

  const handleTimeSelect = (timeQuestion) => {
    setTimePerQuestion(timeQuestion);
  };

  const handleDifficultySelect = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleCreateGame = () => {
    socket.emit("CreateQuiz", {options: { numOfQuestions: numQuestions, category, difficulty, timePerQuestion: timerPerQuestion}}, (data) => {
        const roomId = data
        navigate(`/waiting-room/${roomId}`, { state: { username: "" } }); // Navigate to the WaitingRoom with the quiz ID and username as URL parameters
    });
    
  };

  return (
    <>
      <div className="top-left-emoji">
        <Link to="/" className="link-no-style">
          <h1>Back</h1>
        </Link>
      </div>
      <div className="mt-2 text-center fs-1">
        Create a Room
        <div className="fs-2">Settings</div>
        <div className="container mt-5">
          <div className="row fs-3 mb-5">
            <div className="col">
              Categories
              <div className="dropdown-center mt-4">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categoryName}
                </button>
                <ul className="dropdown-menu">
                  {categoryList.map((option, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(option)}
                      >
                        {option.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col">
              Number of questions
              <div className="dropdown-center mt-4">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {numQuestions}
                </button>
                <ul className="dropdown-menu">
                  {numList.map((option, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => handleNumQuestionsSelect(option)}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col">
              Timer per Question
              <div className="dropdown-center mt-4">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {timerPerQuestion}
                </button>
                <ul className="dropdown-menu">
                  {numList.map((option, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => handleTimeSelect(option)}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col">
              Difficulty
              <div className="dropdown-center mt-4">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {difficulty}
                </button>
                <ul className="dropdown-menu">
                  {difficultyList.map((option, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => handleDifficultySelect(option)}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button
            className="btn btn-success fs-3"
            style={{ padding: "2rem 3rem", marginTop: "100px" }}
            onClick={handleCreateGame}
          >
            Create Game!
          </button>
        </div>
        <img src={spellImage} alt="Electric spell" style={{width:"250px"}}></img>
      </div>
    </>
  );
}

export default SelectCategory;
