import React, { useEffect, useState } from 'react'
import './App.css';
import Nav from '../Nav/Nav'
import Game from '../Game/Game'

function App() {

  const [play, setPlay] = useState(false)

  return (
    <div className="App">
      <Nav 
        play={play}
        setPlay={setPlay}
      />
      <Game />
    </div>
  );
}

export default App;
