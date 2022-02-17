import Header from './components/Header';
import Game from './components/Board/Game';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

let defaultState = {
  players: [
    {
      username: 0,
      playerNumber: 1,
      color: 'red',
      pieces: [
        {
          number: 0,
          position: -11,
          color: 'red'
        },
        {
          number: 1,
          position: -12,
          color: 'red'
        },
        {
          number: 2,
          position: -13,
          color: 'red'
        },
        {
          number: 3,
          position: 15,
          color: 'red'
        }
      ]
    }
  ]
};

function App() {
  const [playerCount, setPlayerCount] = useState(4);
  const [circleSize, setCircleSize] = useState(2);
  const [players, setPlayers] = useState(defaultState.players);
  const [moveCount, setMoveCount] = useState(1);
  const [selectedPiece, setSelectedPiece] = useState(0);
  const [moveIndicator, setMoveIndicator] = useState(0);
  const gameTitle = 'lalalalalala';

  const updatePlayerCount = (e) => {
    if (e.target.value.length > 0) {
      setPlayerCount(parseInt(e.target.value));
    } else {
      setPlayerCount(0);
    }
  }

  const movePieceToPos = (pieceNr, piecePos) => {
    players[0].pieces[pieceNr].position = parseInt(piecePos);
    setPlayers([...players]);
    setSelectedPiece(0);
    setMoveIndicator(0);
  }

  const movePiece = (username, pieceNr) => {
    const player = players.find(p => p.username === username);
    const oldPos = player.pieces[pieceNr].position;
    const newPos = calcPos(oldPos, moveCount, player.playerNumber);

    players.find(p => p.username === username).pieces[pieceNr].position = newPos ? newPos : oldPos;
    setPlayers([...players]);
    setSelectedPiece(0);
    setMoveIndicator(0);
  }

  const calcPos = (oldPos, moveAmount, playerNumber) => {
    let newPos = oldPos;
    let step = 1;

    for (let i = 0; i < Math.abs(moveAmount); i++) {
      const change = moveOneStep(newPos, step, playerNumber);
      step = change.step;
      newPos = change.pos;
      if (!change) {
        return false;
      }
    }

    return newPos === playerNumber * -10 - 5 ? -1 : newPos; // om newPos är cirkeln efter sista i mållinjen ska man hamna i målet
  }

  const moveOneStep = (oldPos, step, playerNumber) => {
    let newPos = oldPos + step;
    let addedPos = playerCount > 4 ? 0 : 1; // blir 0 om playerCount är mer än 4. Annars blir det 1

    if (newPos === playerNumber * -10 - 5) { // om man gått i mål ska man börja studsa om man har steg kvar
      return { pos: newPos, step: -1 };
    }

    if (newPos === playerCount * 10 + 10 + addedPos) { // om man går från sista rutan ska man börja om från banans början
      newPos = 11;
    }

    if (newPos === 10) { // om man står på första rutan och vill gå baklänges ska man hamna på sista rutan
      newPos = playerCount * 10 + 9 + addedPos;
    }

    if (!addedPos && newPos > 0 && newPos % 10 === 0) { // när det är fler än 4 spelare ökar position en extra gång när man passerar någons hem
      newPos += step;
    }

    if (playerNumber !== undefined) {
      if (newPos === playerNumber * 10 + 1) {// om man har gått hela varvet går man in i mållinjen
        newPos = playerNumber * -10 - 9;
      }
    }

    if (newPos === -(playerNumber * 10 + 10)) { // om man backat ut ur mållinjen ska man tillbaka till banan
      newPos = moveOneStep(playerNumber * 10 + 1, -1).pos;
    }

    if (playerNumber !== undefined) {
      const ownPiecesInPath = players.find(p => p.username === playerNumber - 1).pieces.filter(p => p.position === newPos);
      const notThisPieceInPath = ownPiecesInPath.find(p => p.number !== selectedPiece.number);
      if (notThisPieceInPath !== undefined) {
        return false; // det ska inte gå att gå om man går förbi en av sina egna spelpjäser
      }
    }

    return { pos: newPos, step: step }; // pos är ett steg i riktningen step
  }

  useEffect(() => {
    if (selectedPiece !== 0) {
      const targetStepCircle = calcPos(selectedPiece.position, moveCount, selectedPiece.playerNumber);
      setMoveIndicator(targetStepCircle ? targetStepCircle : 0);
    } else {
      setMoveIndicator(0);
    }
  }, [selectedPiece, moveCount]);

  const rollDice = () => {
    console.log('Rolling dice');
    axios.get(`http://localhost:4000/dice`)
      .then(res => setMoveCount(res.data));
  }

  return (
    <div className="App">
      <Header title={gameTitle} />
      <Game movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} playerCount={playerCount} circleSize={circleSize} players={players} />
      Antal spelare:
      <input value={playerCount} onChange={e => { updatePlayerCount(e) }}></input>
      <br />
      Storlek:
      <input value={circleSize} onChange={e => { setCircleSize(e.target.value) }}></input>
      <br />
      Pjäs 1:
      <input value={players[0].pieces[0].position} onChange={e => { movePieceToPos(0, e.target.value) }}></input>
      <br />
      Pjäs 2:
      <input value={players[0].pieces[1].position} onChange={e => { movePieceToPos(1, e.target.value) }}></input>
      <br />
      Pjäs 3:
      <input value={players[0].pieces[2].position} onChange={e => { movePieceToPos(2, e.target.value) }}></input>
      <br />
      Pjäs 4:
      <button onClick={() => movePiece(selectedPiece.playerNumber - 1, selectedPiece.number)}>Gå</button>
      <input value={moveCount} onChange={e => { setMoveCount(e.target.value) }} size='1'></input>
      <input value={players[0].pieces[3].position} onChange={e => { movePieceToPos(3, e.target.value) }} size='1'></input>
      <br />
      <button onClick={rollDice}>Slå tärning</button>


    </div>
  );
}

export default App;
