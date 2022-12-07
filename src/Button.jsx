import React from 'react'

function Button(props) {
  return (
    
    <button type='button' onClick={props.function} className='btn btn-outline-success rounded-pill' style={{padding: "48px 100px",fontSize: "22px"}}>{props.text}</button>

  )
}

export default Button