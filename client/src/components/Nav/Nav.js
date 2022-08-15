import React, { useState, useEffect } from 'react'
import './Nav.css'

function Nav({ speed, setSpeed, setStatus, status, winner, newGame, setTimer, timer, progressGame, showStats, setShowStats, nextRound}) {

  const [banner, setBanner] = useState("W A R")
  const [button, setButton] = useState("Pause")

  useEffect (() => {
    if (status === "New Game") {
      setBanner("Press start to begin game.")
      setButton("Start")
    }
    else if (status === "Started") {
      setBanner("W A R")
      setButton("Pause")
    }
    else if (status === "Paused") {
      setBanner("Game paused.")
      setButton("Play")
    }
    else if (status === "Game Over" && winner) {
      setBanner (`${winner.name} wins! Press start to play again.`)
      setButton("Start")
      clearInterval(timer)
    }
  }, [status, winner])

  function buttonText () {
    if (status === "New Game") {
      setStatus("Started")
      setBanner("W A R")
      setButton("Pause")
      newGame()
      progressGame()
    }
    else if (status === "Started") {
      setStatus("Paused")
      setBanner("Game paused.")
      setButton("Play")
      clearInterval(timer)
    }
    else if (status === "Paused") {
      setStatus("Started")
      setBanner("W A R")
      setButton("Pause")
      setSpeed("1x")
      progressGame()
    }
    else if (status === "Game Over") {
      setStatus("Started")
      setBanner("W A R")
      setButton("Pause")
      newGame()
      progressGame()
    }
  }

  function setTimer1x() {
    clearInterval(timer)
    setTimer(setInterval(nextRound, 1000))
    setSpeed(1000)
  }

  function setTimer2x() {
    clearInterval(timer)
    setTimer(setInterval(nextRound, 500))
    setSpeed(500)
  }

  function setTimer3x() {
    clearInterval(timer)
    setTimer(setInterval(nextRound, 200))
    setSpeed(200)
  }

  function openInNewTab (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  

  return (
    <div id="nav-holder">
      <div className="nav-div" id="nav-div-1">
        <button title="toggle auto-play" onClick={buttonText} className="nav-button">{button}</button>
        <button title="toggle stats" onClick={() => setShowStats(!showStats)} className="nav-button">Stats</button>
        <button onClick={() => openInNewTab('https://bicyclecards.com/how-to-play/war/')} title="open rules (in new tab)" className="nav-button">Rules</button>
      </div>
      <div className="nav-div" id="nav-div-2">
        <h1>{banner}</h1>
      </div>
      <div className="nav-div" id="nav-div-3">
        <button onClick={setTimer1x} title="set game speed to 1x" className={speed === 1000 ? "active" : "nav-button"}>1x</button>
        <button onClick={setTimer2x} title="set game speed to 2x" className={speed === 500 ? "active" : "nav-button"}>2x</button>
        <button onClick={setTimer3x} title="set game speed to 3x" className={speed === 200 ? "active" : "nav-button"}>3x</button>
      </div>
    </div>
  )
}

export default Nav
