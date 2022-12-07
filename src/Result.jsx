import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { postScoreRoute, token } from './constants'

function Result(){

    const [name, setName] = useState('');

    const handleChange = event => {
        setName(event.target.value)
    }

    async function SaveResult(){

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                score: 10,
                name: name,
                categoryId: 24,
                categoryName: "theory"
            })
        }

        await fetch(postScoreRoute, options)
    }


    return (
        <><div className="text-center">
            <h1 className='m-5'>Completed!</h1>
            <h2>Your Score is X/10</h2>
        </div>
        <div className="container">
            <div className="row">
                <div className='col text-end mt-5'>
                    <span className='fs-5'>Name</span>
                </div>
                <div className="col me-3 mt-5">
                    <input className='form-control' type= "text" id="name" onChange={handleChange} value={name}></input>
                </div>
                <div className="col mt-4">
                    <Link to="/leaderboard">
                    <button className='btn btn-warning fs-4 text-wrap' onClick={SaveResult} style={{width: "12rem"}}>Save Score to leaderboard</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className='text-center m-5'>
            <Link to="/selectCategory">
                <button className='btn btn-primary fs-2 px-5 py-4'>Replay</button>
            </Link>
        </div>
    </>
    )
  }

export default Result