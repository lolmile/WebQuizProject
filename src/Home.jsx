import { Link } from "react-router-dom";
import Button from "./Button";


function Home(){
    return <>
    <div className="text-center mt-5">
        <h1>Welcome to Quizzer</h1>
        <p className="mt-5"><h4>Made by: Emile and Arun</h4></p>
        <Link to="/selectCategory">
        <button class="btn btn-secondary px-5 py-4 fs-3 mt-4">Play</button>
        </Link>
    </div>
    </>
}
export default Home;