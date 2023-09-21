import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import spellImage from "./img/spell.png";
import { io } from "socket.io-client";

function SelectCategory() {
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [numQuestions, setNumQuestions] = useState();
  const [timerPerQuestion, setTimePerQuestion] = useState();
  const [difficulty, setDifficulty] = useState();

  const numList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const difficultyList = ["Any", "Easy", "Medium", "Hard"];

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        if (response.ok) {
          const data = await response.json();
          const categories = data.trivia_categories;
          setCategoryList(categories);
          console.log("categories: ", categories);
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
    setCategory(category);
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
    // Connect to the Socket.io server
    const socket = io("http://localhost:5000");

    // TODO: create new quiz and send creator to waiting room
    socket.emit("CreateQuiz", {options: { numOfQuestions: numQuestions, category, difficulty, timePerQuestion: timerPerQuestion}});
    
  };

  return (
    <>
      <div className="top-left-emoji">
        <Link to="/" className="link-no-style">
          <h1>????</h1>
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
                  {category || "Select Category"}
                </button>
                <ul className="dropdown-menu">
                  {categoryList.map((option, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(option.id)}
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
                  {numQuestions || "Select Number of Question(s)"}
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
                  {timerPerQuestion || "Select Time per Question"}
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
                  {difficulty || "Select Difficulty"}
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
        <img src={spellImage} alt="Electric spell"></img>
      </div>
    </>
  );
}

export default SelectCategory;
