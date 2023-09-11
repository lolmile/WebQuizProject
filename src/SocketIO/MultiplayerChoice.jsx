import React, { useContext, useEffect } from 'react'
import { SocketContext } from './SocketContext'
import { useNavigate } from 'react-router-dom'

function MultiplayerChoice() {

    //Use this on every component that emits or receives to WS events.
    const socket = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(socket){
            socket.emit("reach10", {count: 20})
        }else{
            navigate("multiplayer")
            console.log("No Socket found");
        }
    })

  return (
    <div>
        <button>Host</button>
        <button>Join</button>
    </div>
  )
}

export default MultiplayerChoice