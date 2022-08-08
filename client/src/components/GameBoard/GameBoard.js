import React from 'react'
import './GameBoard.css'

function GameBoard({ players }) {

  let player1 = players[0]
  let player2 = players[1]
  
  return (
    <div id="game-holder">
      <div id="player-one" className="player-half">
        <div className="player-name">{player1.name}</div>
        <div className="player-card">CARD</div>
        <div className="card-count">0</div>
      </div>
      <div id="player-two" className="player-half">
        <div className="player-name">{player2.name}</div>
        <div className="player-card">CARD</div>
        <div className="card-count">0</div>
      </div>
    </div>
  )
}

export default GameBoard