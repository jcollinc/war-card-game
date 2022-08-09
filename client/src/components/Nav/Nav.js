import React from 'react'
import './Nav.css'

function Nav({ play, setPlay }) {

  return (
    <div id="nav-holder">
      <div className="nav-div" id="nav-div-1">
        <button onClick={() => setPlay(!play)} className="nav-button">{play ? "Pause" : "Play"}</button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Rules</button>
      </div>
      <div className="nav-div" id="nav-div-2">
        <h1> WAR</h1>
      </div>
      <div className="nav-div" id="nav-div-3">Three</div>
    </div>
  )
}

export default Nav
