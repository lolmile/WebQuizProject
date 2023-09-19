import { useState } from "react";
import {Link} from "react-router-dom"

function SelectCategory(){

  const [category, setCategory] = useState([])
  const [numQuestions, setNumQuestions] = useState([])
  const [timerPerQuestion, setTimePerQuestion] = useState([])
  const [difficulty, setDifficulty] = useState([])

    return (
        <>
        <div className="mt-5 text-center fs-1">
          Create a Room
          <div className="fs-2">
            Settings
          </div>
          <div className="container mt-5">
            <div className="row fs-3">
              <div className="col">
                Categories
                <div className="dropdown-center mt-4">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item"></a></li>
                  </ul>
                </div>
              </div>
              <div className="col">
                Number of questions
              </div>
              <div className="col">
                Timer per Question
              </div>
              <div className="col">
                Difficulty
              </div>
            </div>
          </div>
        </div>
    </>
    )
}
export default SelectCategory;