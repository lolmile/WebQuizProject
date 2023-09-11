import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {token, top10route} from './constants.js'
import Row from "./Row.jsx"

function Leaderboard() {

    const [scores, setScores] = useState([])

    useEffect(() => {
        //Called upon component mount
        fetchScores()
    }, [])

    async function fetchScores(){

        const options = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        }

        const response = await fetch(top10route, options)
        const data = await response.json();

        setScores(data)
    }

    return (
    <div>
        <div>
            <Link to="/selectCategory">
            <button className="btn btn-secondary px-5 py-4 fs-3" style={{float: "right", marginRight: "120px"}}>Replay</button>
            </Link>
        </div>
        <div className="text-center">
            <h1 className='' style={{ marginTop: "75px",marginLeft: "304px", marginBottom: "70px"}}>Top Scores</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col text-center my-3">
                    <table style={{width: "100%", border:"1px solid black"}}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            scores.map((data, index) => {
                                return <Row key = {index} name = {data.name} category = {data.categoryName} score = {data.score}/>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
    )
}

export default Leaderboard