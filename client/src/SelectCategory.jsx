import { useContext, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import spellImage from "./img/spell.png";
import { SocketContext } from "./SocketIO/SocketContext";
import { io } from 'socket.io-client';

function SelectCategory(){

  const [categoryList, setCategoryList] = useState([])
  const [socket, setSocket] = useState(null);
  const [category, setCategory] = useState()
  const [numQuestions, setNumQuestions] = useState()
  const [timerPerQuestion, setTimePerQuestion] = useState()
  const [difficulty, setDifficulty] = useState()

  const numList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
  const difficultyList = ['Any', 'Easy', 'Medium', 'Hard']
  const SERVER_HOST = "http://localhost:5000";

  useEffect(() => {

    const newSocket = io(SERVER_HOST);

    newSocket.on("connect", () => {
      console.log("Connected to WS server");
      setSocket(newSocket);
    });
    
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        if (response.ok) {
          const data = await response.json();
          // Extract the category names from the response
          const categories = data.trivia_categories.map(category => category.name);
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

  const createQuiz = () => {
    const options = {
      numOfQuestions: numQuestions,
      category: category,
      difficulty: difficulty,
      timePerQuestion: timerPerQuestion
    }
    socket.emit("getQuestion", options)
  }

    return (
        <>
      <div className="top-left-emoji">
        <Link to="/" className="link-no-style">
          <h1>Back</h1>
        </Link>
      </div>
        <div className="mt-2 text-center fs-1">
          Create a Room
          <div className="fs-2">
            Settings
          </div>
          <div className="container mt-5">
            <div className="row fs-3 mb-5">
              <div className="col">
                Categories
                <div className="dropdown-center mt-4">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {category || "Select Category"}
                  </button>
                  <ul className="dropdown-menu">
                  {categoryList.map((option, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(option)}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
              <div className="col">
                Number of questions
                <div className="dropdown-center mt-4">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
            <button className="btn btn-success fs-3" style={{padding : "2rem 3rem", marginTop : "100px"}} onClick={createQuiz}>Create Game!</button>
          </div>
          <img src={spellImage} alt="Electric spell"></img>
        </div>
    </>
    )
}
export default SelectCategory;