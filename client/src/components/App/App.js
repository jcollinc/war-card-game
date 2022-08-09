import React, { useEffect, useState } from 'react'
import './App.css';
import Game from '../Game/Game'

function App() {

  const [play, setPlay] = useState(false)
  const [status, setStatus] = useState("Started")
  const [winner, setWinner] = useState(null)

  return (
    <div className="App">
      <Game 
        winner={winner}
        setWinner={setWinner}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}

export default App;
