import { Link } from "react-router-dom";


function Home(){
    return <>
    <div className="text-center mt-5">
        <h1>Welcome to QuizWiz</h1>
        <p className="mt-5"></p>
        <h4>Made by: Emile and Jeremy</h4>
        <Link to="/selectCategory">
        <button className="btn btn-secondary px-5 py-4 fs-3 mt-4">Play</button>
        </Link>
        <div>
        <Link to="/leaderboard">
        <button className="btn btn-success px-3 py-2 fs-6 mt-4">Leaderboard</button>
        </Link>
        </div>


    </div>
    </>
}
export default Home;