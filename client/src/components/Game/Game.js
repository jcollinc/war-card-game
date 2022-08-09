import React, { useState, useEffect } from 'react'
import Nav from '../Nav/Nav'
import './Game.css'

function Game({ setStatus, status, winner, setWinner }) {
  const [war, setWar] = useState(false)
  const [hand1, setHand1] = useState([])
  const [hand2, setHand2] = useState([])
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])
  const [remaining1, setRemaining1] = useState()
  const [remaining2, setRemaining2] = useState()
  const [gameOver, setGameOver] = useState(false)
  const [winnings, setWinnings] = useState([])
  const [players, setPlayers] = useState([])

  const [deck, setDeck] = useState([
    ["🂢",2],["🂣",3],["🂤",4],["🂥",5],["🂦",6],["🂧",7],["🂨",8],["🂩",9],["🂪",10],["🂫",11],["🂭",12],["🂮",13],["🂡",14],
    ["🂲",2],["🂳",3],["🂴",4],["🂵",5],["🂶",6],["🂷",7],["🂸",8],["🂹",9],["🂺",10],["🂻",11],["🂽",12],["🂾",13],["🂱",14],
    ["🃒",2],["🃓",3],["🃔",4],["🃕",5],["🃖",6],["🃗",7],["🃘",8],["🃙",9],["🃚",10],["🃛",11],["🃝",12],["🃞",13],["🃑",14],
    ["🃂",2],["🃃",3],["🃄",4],["🃅",5],["🃆",6],["🃇",7],["🃈",8],["🃉",9],["🃊",10],["🃋",11],["🃍",12],["🃎",13],["🃁",14]
  ]) 
  // const [deck, setDeck] = useState([
  //   ["🂢",2],["🂣",3],["🂤",4],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],
  //   ["🂲",2],["🂳",3],["🂴",4],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],
  //   ["🃒",2],["🃓",3],["🃔",4],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],
  //   ["🃂",2],["🃃",3],["🃄",4],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11],["🂫",11]
  // ]) 

  useEffect(() => {

    fetch("http://127.0.0.1:3000/players")
    .then(r => r.json())
    .then(allPlayers => {
      setPlayers(allPlayers)
    })
    newGame()
  }, [])  
  
  let toPlay1 = []
  let toPlay2 = []
  let pot = []   
  let warring = false

  function newGame() {
    shuffle(deck)
    toPlay1 = (deck.slice(0,26))
    toPlay2 = (deck.slice(26))
    setLeft(toPlay1.shift())
    setRight(toPlay2.shift())
    setStatus("Started")
    setHand1(toPlay1)
    setHand2(toPlay2)
    setWinner(null)
    setWar(false)
    setWinnings(false)
    setRemaining1(toPlay1.length)
    setRemaining2(toPlay2.length)
  }
  
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }

  function logHands() {
    console.log(left)
    console.log(right)
    console.log(hand1)
    console.log(hand2)
  }

  function updateHands (toPlay1, toPlay2) {
    setHand1(toPlay1)
    setHand2(toPlay2)
  }

  function nextRound() {

    setRemaining1(hand1.length)
    setRemaining2(hand2.length)

    if ((hand1.length === 0 || hand2.length === 0)) {
      setGameOver(true)
      setWinner(!hand1.length ? players[1] : players[0])
      endGame(winner)
      return
    }
    pot = []
    setWar(false)
    let newStatus = "Started"
    let roundOver = false
    let leftCard
    let rightCard
    toPlay1 = hand1
    toPlay2 = hand2
    leftCard = toPlay1.shift()
    rightCard = toPlay2.shift()
    pot.push(leftCard, rightCard)
    setWinnings(pot)
    
    if (leftCard[1] > rightCard[1]) {
      roundOver = true
      toPlay1.push(...pot)
    } 
    else if (leftCard[1] < rightCard[1]) {
      roundOver = true
      toPlay2.push(...pot)
    }
    else if (left[1] === right[1]) {
      setWar(true)
    }
    if (!toPlay1.length || !toPlay2.length) {
      newStatus = "Game Over"
    }

    //Setup Next Round
    setStatus(newStatus);
    setWinnings(pot)
    setLeft(leftCard)
    setRight(rightCard)
  }

  function declareWar (toPlay1, toPlay2, leftCard, rightCard, pot, newStatus) {

    setStatus(newStatus);
    setWinnings(pot)
    setLeft(leftCard)
    setRight(rightCard)
    setHand1(toPlay1)
    setHand2(toPlay2)
    
    warring = true
    setWar(true)

    if (warring) {
      if (toPlay1.length < 2) {
      newStatus = "Game Over"
      setWinner(players[1])
      warring = false
      setWar(false)
    }
    else if (toPlay2.length < 2) {
      newStatus = "Game Over"
      setWinner(players[0])
      warring = false
      setWar(false)
    } else {
      pot.push(toPlay1.shift(), toPlay2.shift())
      setWinnings(pot)
      leftCard = toPlay1.shift()
      rightCard = toPlay2.shift()
      pot.push(leftCard, rightCard)
      setWinnings(pot)
      if (leftCard !== rightCard) {
        warring = false
        setWar(false)
        if (leftCard > rightCard) {
          toPlay1.push(...pot)
        } else {
          toPlay2.push(...pot)
        }
      }
    }}
  }

  function endGame() {
    console.log(`${winner.name} wins!`)
  }

  // function endGame (winner) {
  //   setGameOver(true)
  //   fetch('http://127.0.0.1:3000/players', {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       title: 'foo',
  //     }),
  //     headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  // .then((response) => response.json())
  // .then((json) => console.log(json));
  // }

  return (
    <>
    <Nav 
      setStatus={setStatus}
      winner={winner}
      status={status}
    />
    <div id="game-holder">
      <div id="player-one" className="player-half">
        <div className="player-name"><h2>Player 1</h2></div>
        <button onClick={war ? declareWar : nextRound}>Next Round</button>
        {!left ? null : <div className="player-card">{!war ? left[0] : `${winnings[0][0]} 🂠 ${left[0]}`}</div>}
        <div className="card-count">Cards Remaining: {remaining1}</div>
      </div>
      <div id="player-two" className="player-half">
        <div className="player-name"><h2>Player 2</h2></div>
        {!right ? null : <div className="player-card">{!war ? right[0] : `${winnings[1][0]} 🂠 ${right[0]}`}</div>}
        <div className="card-count">Cards Remaining: {remaining2}</div>
        <button onClick={logHands}>Log Hands</button>
      </div>
    </div>
    </>
  )
}

export default Game