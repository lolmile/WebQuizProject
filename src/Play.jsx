import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

function Play() {
  return (
    <div>
      <div>
        <span className='fs-3' style={{textAlign: "left"}}>Q. 1/10</span>
        <Link to="/">
          <button class="btn btn-secondary px-3 py-2 fs-4" style={{float: "right", marginRight: "20px", marginTop: "20px"}}>Stop</button>
        </Link>
      </div>
        <div class="text-center">
            <h1 className='m-5'>History Quiz</h1>
            <h2>1. What is the capital of Hungary?</h2>
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
    </div>
  )
}

export default Play
