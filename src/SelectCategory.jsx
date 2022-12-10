import {Link} from "react-router-dom"
import Button from "./Button";

function SelectCategory(){

  function setSport(){
    localStorage.setItem('categoryid', 21)
    localStorage.setItem('categoryName', 'Sports')
  }
  function setHistory(){
    localStorage.setItem('categoryid', 23)
    localStorage.setItem('categoryName', 'History')
  }
  function setVehicule(){
    localStorage.setItem('categoryid', 28)
    localStorage.setItem('categoryName', 'Vehicules')
  }
  function setAnimal(){
    localStorage.setItem('categoryid', 27)
    localStorage.setItem('categoryName', 'Animal')
  }

    return (
        <>
        <div className="m-1">
        <Link to="/">
          <button className="btn btn-secondary px-3 py-1 fs-5 mt-2 ms-2">Exit</button>
        </Link>
        </div>
        <div className="text-center">
            <h1 className='m-5'>New Quiz</h1>
            <h2>Please select a category</h2>
        </div>
        <div className='container'>
          <div className="row my-5">
            <div className="col text-end me-5"><Link to="/play"><Button function = {setHistory} text = "History"/></Link></div>
            <div className="col"><Link to="/play"><Button function = {setSport} text = "Sports"/></Link></div>
          </div>
          <div className="row mt-5">
            <div className="col text-end me-5"><Link to="/play"><Button function = {setVehicule} text = "Vehicules"/></Link></div>
            <div className="col"><Link to="/play"><Button function = {setAnimal} text="Animals"/></Link></div>
          </div>
        </div>
    </>
    )
}
export default SelectCategory;