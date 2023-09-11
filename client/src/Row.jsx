import React from 'react'
import './TableDesign.css'

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