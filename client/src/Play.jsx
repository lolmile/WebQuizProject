import React, { useEffect, useState, useContext } from 'react'
import Question from './Question';
import Spinner from './Spinner';
import Result from './Result';
import { SocketContext } from "./SocketIO/SocketContext.js";
import { useNavigate } from 'react-router-dom';

function Play() {

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [questionCategory, setQuestionCategory] = useState()
    const [totalQuestions, setTotalQuestions] = useState()
    const [question, setQuestion] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [quizId, setQuizId] = useState()


    const socket = useContext(SocketContext);
    const navigate = useNavigate()

    useEffect(() => {

        if (!socket){
            navigate("/")
        }

        socket.on("NextQuestion", (quizData) => {
            setQuestion(quizData.question)
            setActiveQuestionIndex(quizData.currentQuestionIndex)
            setTotalQuestions(quizData.totalQuestions)
            setQuestionCategory(quizData.questionCategory)
            setQuizId(quizData.quizId)
            setIsLoading(false)
        })

        socket.on("QuizDone", (data) =>{
            navigate("/leaderboard")
        })

    }, [socket])

    function selectAnswerHandler(answer) {
        setIsLoading(true);

        if (answer.correct) {
            socket.emit("QuestionAnswer", {quizId})
        }
    }

    return (
        <div className='container rounded p-4 my-2' style={{ backgroundColor: "#c0deff" }}>
            <div className="row">
                {
                    isLoading ? <Spinner light={true} size={4}></Spinner>
                        : (totalQuestions === 0 ? <></> :
                            <>
                                  <div className="container">
                                    <div className="row">
                                        <div className="col-12 text-center h1 mb-5">{questionCategory}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-center h2">Question {activeQuestionIndex + 1}/{totalQuestions}</div>
                                    </div>
                                    <div className="row">
                                        <Question question={question.question} correct_answer={question.correct_answer} incorrect_answers={question.incorrect_answers} selectAnswerHandler={selectAnswerHandler}
                                        ></Question>
                                    </div>
                                </div>
                            </>)}
            </div>

        </div>
    )
}

export default Play