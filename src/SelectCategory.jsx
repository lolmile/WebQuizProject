import {Link} from "react-router-dom"

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
        </>
    )
}
export default SelectCategory;