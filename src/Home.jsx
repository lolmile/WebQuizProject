import { Link } from "react-router-dom";
import Button from "./Button";


function Home(){
    return <>
    <div className="text-center mt-5">
        <h1>Welcome to Quizzer</h1>
        <p className="mt-5"><h4>Made by: Emile and Arun</h4></p>
        <Link to="/selectCategory">
        <button type="button" class="btn btn-secondary mt-5" style={{padding: "30px 100px",fontSize: "22px"}}>
            Play
        </button>
        </Link>
        
    </div>
    
    </>
}
export default Home;