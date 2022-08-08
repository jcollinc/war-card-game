import React, { useEffect, useState } from 'react'
import './App.css';
import Nav from '../Nav/Nav'
import GameBoard from '../GameBoard/GameBoard'

function App() {

  const [players, setPlayers] = useState([])

  useEffect (() => {
    fetch("http://127.0.0.1:3000/players")
    .then(r => r.json())
    .then(allPlayers => {
      console.log(allPlayers)
      setPlayers(allPlayers)
    })
  }, [])

  console.log(players)

  return (
    <div className="App">
      <Nav />
      <GameBoard />
    </div>
  );
}

export default App;
