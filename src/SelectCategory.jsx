import {Link} from "react-router-dom"
import Button from "./Button";

function SelectCategory(){
    return (
        <>
        <div class="m-1">
        <Link to="/">
          <button class="btn btn-secondary px-3 py-1 fs-5 mt-2 ms-2">Exit</button>
        </Link>
        </div>
        <div class="text-center">
            <h1 className='m-5'>New Quiz</h1>
            <h2>Please select a category</h2>
        </div>
        <div className='container'>
          <div className="row my-5">
            <div className="col text-end me-5"><Link to="/play"><Button text = "Category 1"/></Link></div>
            <div className="col"><Link to="/play"><Button text = "Category 2"/></Link></div>
          </div>
          <div className="row mt-5">
            <div className="col text-end me-5"><Link to="/play"><Button text = "Category 3"/></Link></div>
            <div className="col"><Link to="/play"><Button text="Category 4"/></Link></div>
          </div>
        </div>
    </>
    )
}
export default SelectCategory;