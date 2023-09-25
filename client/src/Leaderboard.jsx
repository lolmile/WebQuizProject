import { useEffect, useContext } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {token, top10route} from './constants.js'
import { SocketContext } from "./SocketIO/SocketContext.js";
import Row from "./Row.jsx"

function Leaderboard() {

    const [players, setPlayers] = useState([])
    const socket = useContext(SocketContext);
    const navigate = useNavigate

    useEffect(() => {

        if (!socket){
            navigate("/")
        }

        socket.on("ReceiveScores", (data) => {
            setPlayers(data.players)
        })
    }, [])


    return (
    <div>
        <div>
            <Link to="/">
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
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            players.map((player, index) => {
                                return <Row key = {index} name = {player.username} score = {player.score}/>
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