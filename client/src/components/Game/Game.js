import React, { useState, useEffect } from 'react'
import Nav from '../Nav/Nav'
import './Game.css'

function Game({ setStatus, status, winner, setWinner }) {

  const [p1HandState, setP1HandState] = useState([])
  const [p2HandState, setP2HandState] = useState([])
  const [speed, setSpeed] = useState(1000)
  const [timer, setTimer] = useState()
  // const [deck, setDeck] = useState([
  //   ["🂢",2],["🂣",3],["🂤",4],["🂥",5],["🂦",6],["🂧",7],["🂨",8],["🂩",9],["🂪",10],["🂫",11],["🂭",12],["🂮",13],["🂡",14],
  //   ["🂲",2],["🂳",3],["🂴",4],["🂵",5],["🂶",6],["🂷",7],["🂸",8],["🂹",9],["🂺",10],["🂻",11],["🂽",12],["🂾",13],["🂱",14],
  //   ["🃒",2],["🃓",3],["🃔",4],["🃕",5],["🃖",6],["🃗",7],["🃘",8],["🃙",9],["🃚",10],["🃛",11],["🃝",12],["🃞",13],["🃑",14],
  //   ["🃂",2],["🃃",3],["🃄",4],["🃅",5],["🃆",6],["🃇",7],["🃈",8],["🃉",9],["🃊",10],["🃋",11],["🃍",12],["🃎",13],["🃁",14]
  // ]) 

  const [deck, setDeck] = useState([
    [["🂢"],2],[["🂣"],3],[["🂤"],4],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],
    [["🂲"],2],[["🂳"],3],[["🂴"],4],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],
    [["🃒"],2],[["🃓"],3],[["🃔"],4],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],
    [["🃂"],2],[["🃃"],3],[["🃄"],4],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11],[["🂫"],11]
  ]) 

  useEffect(() => {
    newGame()
  }, [])  
  
  let p1Hand = []
  let p2Hand = []
  let p1Played = []
  let p2Played = []
  let winnings = []   
  let war = false

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }

  function newGame() {
    fetch("/players")
    .then(r => r.json())
    .then(allPlayers => {
      setPlayers(allPlayers)
    })
    shuffle(deck)
    p1Hand = (deck.slice(0,26))
    p2Hand = (deck.slice(26))
    setP1HandState(p1Hand)
    setP2HandState(p2Hand)
  }

  function updateHands(p1Hand, p2Hand) {
    setP1HandState(p1Hand)
    setP2HandState(p2Hand)
  }
  
  function progressGame () {
    setTimer(setInterval(nextRound, speed))
  }

  function nextRound() {

    if ((p1HandState.length === 0 || p2HandState.length === 0)) {
      clearInterval(timer)
      setWinner(!p1HandState.length ? players[1] : players[0])
      endGame(!p1HandState.length ? players[1] : players[0])
      return
    }
    p1Hand = p1HandState
    p2Hand = p2HandState
    leftCard = p1Hand.shift()
    rightCard = p2Hand.shift()
    winnings.push(leftCard, rightCard)
    setWinnings(pot)
    
    if (leftCard[1] > rightCard[1]) {
      toPlay1.push(...pot)
    } 
    else if (leftCard[1] < rightCard[1]) {
      toPlay2.push(...pot)
    }
    else if (leftCard[1] === rightCard[1]) {
      setWar(true)
      setLeft([...leftCard[0], "🂠"])
      setRight([...rightCard[0], "🂠"])
      declareWar(toPlay1, toPlay2, leftCard, rightCard, pot, newStatus)
      return
    }
    if (!toPlay1.length || !toPlay2.length) {
      newStatus = "Game Over"
    }
    //Setup Next Round
    setStatus(newStatus);
    setWinnings(pot)
    setLeft([...leftCard[0], "🂠"])
    setRight([...rightCard[0], "🂠"])
  }

  function declareWar (toPlay1, toPlay2, leftCard, rightCard, pot, newStatus) {

    setStatus(newStatus);
    setWinnings(pot)
    setLeft([...leftCard[0], "🂠"])
    setRight([...rightCard[0], "🂠"])
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
        setLeft([...leftCard[0], "🂠"])
        setRight(rightCard[0])
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
    fetch(`players/${winner.id}`, {
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
      speed={speed}
      setSpeed={setSpeed}
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
        {!left ? null : <div className="player-card">{left[0]}</div>}
        <div className="card-count">Cards Remaining: {remaining1}</div>
      </div>
      <div id="player-two" className="player-half">
        <div className="player-name"><h2>Player 2 {showStats ? `: ${players[1].games_won} win${players[1].games_won === 1 ? "" : "s"}` : null}</h2></div>
        {!right ? null : <div className="player-card">{right[0]}</div>}
        <div className="card-count">Cards Remaining: {remaining2}</div>
      </div>
    </div>
    </>
  )
}

export default Game