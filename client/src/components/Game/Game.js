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
  const [timer, setTimer] = useState()
  const [showStats, setShowStats] = useState(false)

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
    newGame()
  }, [])  
  
  let toPlay1 = []
  let toPlay2 = []
  let pot = []   
  let warring = false

  function newGame() {
    
    fetch("http://127.0.0.1:3000/players")
    .then(r => r.json())
    .then(allPlayers => {
      setPlayers(allPlayers)
    })
    shuffle(deck)
    toPlay1 = (deck.slice(0,26))
    toPlay2 = (deck.slice(26))
    setLeft(null)
    setRight(null)
    setStatus("New Game")
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

  function progressGame () {
    setTimer(setInterval(nextRound, 1000))
  }

  function updateHands (toPlay1, toPlay2) {
    setHand1(toPlay1)
    setHand2(toPlay2)
  }

  function nextRound() {

    setRemaining1(hand1.length)
    setRemaining2(hand2.length)

    if ((hand1.length === 0 || hand2.length === 0)) {
      clearInterval(timer)
      setGameOver(true)
      setWinner(!hand1.length ? players[1] : players[0])
      endGame(!hand1.length ? players[1] : players[0])
      return
    }
    pot = []
    setWar(false)
    let newStatus = "Started"
    let leftCard
    let rightCard
    toPlay1 = hand1
    toPlay2 = hand2
    leftCard = toPlay1.shift()
    rightCard = toPlay2.shift()
    pot.push(leftCard, rightCard)
    setWinnings(pot)
    
    if (leftCard[1] > rightCard[1]) {
      toPlay1.push(...pot)
    } 
    else if (leftCard[1] < rightCard[1]) {
      toPlay2.push(...pot)
    }
    else if (leftCard[1] === rightCard[1]) {
      setWar(true)
      setLeft(leftCard)
      setRight(rightCard)
      declareWar(toPlay1, toPlay2, leftCard, rightCard, pot, newStatus)
      return
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
    console.log("WARRING")
    console.log(pot)

    setStatus(newStatus);
    setWinnings(pot)
    setLeft(leftCard)
    setRight(rightCard)
    setHand1(toPlay1)
    setHand2(toPlay2)
    
    warring = true
    setWar(true)

    if (warring) {
      if (hand1.length < 2) {
        clearInterval(timer)
        setGameOver(true)
        setWinner(players[1])
        endGame(players[1])
        return
      }
    else if (hand2.length < 2) {
      clearInterval(timer)
      setGameOver(true)
      setWinner(players[0])
      endGame(players[0])
      return
    } else {
        pot.push(toPlay1.shift(), toPlay2.shift())
        leftCard = toPlay1.shift()
        rightCard = toPlay2.shift()
        pot.push(leftCard, rightCard)
        setLeft(leftCard)
        setRight(rightCard)
        setWinnings(pot)
        if (leftCard !== rightCard) {
          warring = false
          setWar(false)
          if (leftCard > rightCard) {
            toPlay1.push(...pot)
            console.log(`player 1 won ${pot.length} cards: ${pot}`)
          } else {
            toPlay2.push(...pot)
            console.log(`player 2 won ${pot.length} cards: ${pot}`)
          }
        }
    }}
    updateHands(toPlay1, toPlay2)
  }

  function endGame(winner) {
    let wins = winner.games_won + 1
    setGameOver(true)
    setStatus("Game Over")
    clearInterval(timer)
    fetch(`http://127.0.0.1:3000/players/${winner.id}`, {
      method: 'PATCH',
      body: JSON.stringify({games_won: wins}),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(r => r.json())
    .then((res) => console.log(res));
  }

  return (
    <>
    <Nav 
      setStatus={setStatus}
      winner={winner}
      status={status}
      newGame={newGame}
      timer={timer}
      nextRound={nextRound}
      setTimer={setTimer}
      showStats={showStats}
      setShowStats={setShowStats}
      progressGame = {progressGame}
    />
    <div id="game-holder">
      <div id="player-one" className="player-half">
        <div className="player-name"><h2>Player 1 {showStats ? `: ${players[0].games_won} win${players[0].games_won === 1 ? "" : "s"}` : null}</h2></div>
        {!left ? null : <div className="player-card">{warring ? `${winnings[0][0]} 🂠 ${left[0]}` : left[0]}</div>}
        <div className="card-count">Cards Remaining: {remaining1}</div>
      </div>
      <div id="player-two" className="player-half">
        <div className="player-name"><h2>Player 2 {showStats ? `: ${players[1].games_won} win${players[1].games_won === 1 ? "" : "s"}` : null}</h2></div>
        {!right ? null : <div className="player-card">{warring ? `${right[0]} 🂠 ${winnings[1][0]}` : right[0]}</div>}
        <div className="card-count">Cards Remaining: {remaining2}</div>
      </div>
    </div>
    </>
  )
}

export default Game