import { Link } from "react-router-dom"
import './TableDesign.css'

function Leaderboard() {

    return (
    <div>
        <div>
            <Link to="/selectCategory">
            <button className="btn btn-secondary px-5 py-4 fs-3" style={{float: "right", marginRight: "120px"}}>Replay</button>
            </Link>
        </div>
        <div class="text-center">
            <h1 className='' style={{ marginTop: "75px",marginLeft: "130px", marginBottom: "80px"}}>Top Scores</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col text-center my-3">
                    <table style={{width: "100%", border:"1px solid black"}}>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Score</th>
                        </tr>
                        <tr>
                            <td>Jane Doe</td>
                            <td>History</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>Mary</td>
                            <td>Geography</td>
                            <td>7</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
    )
}

export default Leaderboard