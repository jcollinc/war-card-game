import React, { useState, useEffect } from 'react'
import './Nav.css'

function Nav({ setStatus, status, winner, newGame}) {

  const [banner, setBanner] = useState("W A R")
  const [button, setButton] = useState("Pause")

  useEffect (() => {
    if (status === "New Game") {
      setBanner("Press start to begin game.")
      setButton("Start")
    }
    else if (status === "Started") {
      setBanner("W A R")
    }
    else if (status === "Paused") {
      setBanner("Game paused.")
    }
    else if (status === "Game Over" && winner) {
      setBanner (`${winner.name} wins! Press start to play again.`)
      setButton("Start")
    }
  }, [status, winner])

  function buttonText () {
    if (status === "New Game") {
      setStatus("Started")
      setBanner("W A R")
      setButton("Pause")
      newGame()
    }
    else if (status === "Started") {
      setStatus("Paused")
      setBanner("Game paused.")
      setButton("Play")
    }
    else if (status === "Paused") {
      setStatus("Started")
      setBanner("W A R")
      setButton("Pause")
    }
    else if (status === "Game Over") {
      setStatus("Started")
      setBanner("W A R")
      setButton("Start")
      newGame()
    }
  }
  

  return (
    <div id="nav-holder">
      <div className="nav-div" id="nav-div-1">
        <button onClick={buttonText} className="nav-button">{button}</button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Rules</button>
      </div>
      <div className="nav-div" id="nav-div-2">
        <h1>{banner}</h1>
      </div>
      <div className="nav-div" id="nav-div-3">Three</div>
    </div>
  )
}

export default Nav
