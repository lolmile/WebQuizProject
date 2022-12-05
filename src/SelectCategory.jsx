import {Link} from "react-router-dom"
import Button from "./Button";

function SelectCategory(){
    return (
        <>
        <Link to="/">
        <button type="button" class="btn btn-secondary m-2 p-4">Back</button>
        </Link>
        <div class="text-center">
            <h1>New Quiz</h1>
            <h2>Please select a category</h2>
        </div>
        <div className='container'>
          <div className="row my-5">
            <div className="col text-end me-5"><Button text = "Option 1"/></div>
            <div className="col"><Button text = "Option 2"/></div>
          </div>
          <div className="row mt-5">
            <div className="col text-end me-5"><Button text = "Option 3"/></div>
            <div className="col"><Button text = "Option 4"/></div>
          </div>
        </div>
    </>
    )
}
export default SelectCategory;