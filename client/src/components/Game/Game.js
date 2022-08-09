import React, { useState, useEffect } from 'react'
import './Game.css'

function Game({}) {
  const [hand1, setHand1] = useState([[],[]])
  const [hand2, setHand2] = useState([[],[]])
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])
  const [deck, setDeck] = useState([
    ["🂢",2],["🂣",3],["🂤",4],["🂥",5],["🂦",6],["🂧",7],["🂨",8],["🂩",9],["🂪",10],["🂫",11],["🂭",12],["🂮",13],["🂡",14],
    ["🂲",2],["🂳",3],["🂴",4],["🂵",5],["🂶",6],["🂷",7],["🂸",8],["🂹",9],["🂺",10],["🂻",11],["🂽",12],["🂾",13],["🂱",14],
    ["🃒",2],["🃓",3],["🃔",4],["🃕",5],["🃖",6],["🃗",7],["🃘",8],["🃙",9],["🃚",10],["🃛",11],["🃝",12],["🃞",13],["🃑",14],
    ["🃂",2],["🃃",3],["🃄",4],["🃅",5],["🃆",6],["🃇",7],["🃈",8],["🃉",9],["🃊",10],["🃋",11],["🃍",12],["🃎",13],["🃁",14]
  ]) 

  let toPlay1 = []
  let toPlay2 = []
  let won1 = []
  let won2 = []

  useEffect(() => {
    shuffle(deck)
    toPlay1 = (deck.slice(0,26))
    toPlay2 = (deck.slice(26))
    setHand1([toPlay1, won1])
    setHand2([toPlay2, won2])
    updateHands()
  }, [])
  
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }

  function updateHands() {
    setHand1(hand1 => [hand1[0], hand1[1]])
    setHand2(hand2 => [hand2[0], hand2[1]])
    setLeft(toPlay1[0])
    setRight(toPlay2[0])    
    console.log(hand1, hand2)
  }

  function logHands() {
    console.log(left)
    console.log(right)
    console.log(hand1)
    console.log(hand2)
  }

  function nextRound() {
    
    toPlay1 = hand1[0].slice(1)
    toPlay2 = hand2[0].slice(1)
    
    if (left[1] > right[1]) {
      console.log(`${left[1]} is greater than ${right[1]}`)
      won1 = [left, right]
      won2 = []
    } 
    
    else if (left[1] < right[1]) {
      console.log(`${right[1]} is greater than ${left[1]}`)
      won1 = []
      won2 = [left, right]
    }

    setHand1([toPlay1, [...hand1[1], ...won1]])
    setHand2([toPlay2, [...hand2[1], ...won2]])
    updateHands()
  }

  return (
    <div id="game-holder">
      <div id="player-one" className="player-half">
        <div className="player-name"><h2>Player 1</h2></div>
        <div className="player-card">{left ? left[0] : "..."}</div>
        <div className="card-count">Cards Remaining: {hand1[0].length + hand1[1].length}</div>
        <button onClick={nextRound}>Next Round</button>
      </div>
      <div id="player-two" className="player-half">
        <div className="player-name"><h2>Player 2</h2></div>
        <div className="player-card">{right ? right[0] : "..."}</div>
        <div className="card-count">Cards Remaining: {hand2[0].length + hand2[1].length}</div>
        <button onClick={logHands}>Log Hands</button>
      </div>
    </div>
  )
}

export default Game