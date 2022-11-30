import { Link } from "react-router-dom";

function Home(){
    return <>
    <div className="text-center">
        <h1>Welcome to Quizzer</h1>
        <p>Made by: Emile and Arun</p>
        <Link to="/selectCategory">
        <button type="button" class="btn btn-secondary btn-lg">
            Play
        </button>
        </Link>
    </div>
    
    </>
}
export default Home;