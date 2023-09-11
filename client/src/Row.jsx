import React from 'react'

function Row(props) {
  return ( 
    <tr>
        <td>{props.name}</td>
        <td>{props.category}</td>
        <td>{props.score}</td>
    </tr>
  )
}

export default Row