import React, { useEffect, useState, useContext } from 'react'
import Question from './Question';
import Spinner from './Spinner';
import Result from './Result';
import { SocketContext } from "./SocketIO/SocketContext.js";

function Play() {

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState()
    const [question, setQuestion] = useState({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const socket = useContext(SocketContext);


    useEffect(() => {

           // Check if the socket is connected
        if (socket.connected) {
            setSocketConnected(true);
            console.log("Socket is connected.");
        } else {
            setSocketConnected(false);
            console.log("Socket is not connected.");
        }

        socket.on("NextQuestion", (quizData) => {
            console.log("received question");
            setQuestion(quizData.question)
            setActiveQuestionIndex(quizData.currentQuestionIndex)
            setTotalQuestions(quizData.totalQuestions)
        })

    }, [socket])

    function selectAnswerHandler(answer) {
        setIsLoading(true);

        if (answer.correct) {
            //EMIT SCORE ++            
        }

        //if (activeQuestionIndex === numberOfQuestions - 1) {
            // last question
            //SET QUIZ FINISH
            //EMIT QUIZ FINISHED
        //}

        setTimeout(() => {
            setIsLoading(false);
        }, 200)
    }

    return (
        <div className='container rounded p-4 my-2' style={{ backgroundColor: "#c0deff" }}>
            <div className="row">
                {
                    isLoading ? <Spinner light={true} size={4}></Spinner>
                        : (totalQuestions === 0 ? <></> :
                            <>
                                {!quizFinished ?
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 text-center h1 mb-5">Qwiz</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 text-center h2">Question {activeQuestionIndex + 1}/{totalQuestions}</div>
                                        </div>
                                        <div className="row">
                                            <Question question={question.question} correct_answer={question.correct_answer} incorrect_answers={question.incorrect_answers} selectAnswerHandler={selectAnswerHandler}
                                            ></Question>
                                        </div>
                                    </div> : <>
                                        {/*GO TO LEADERBOARD*/}
                                    </>
                                }
                            </>)}
            </div>

        </div>
    )
}

export default Play