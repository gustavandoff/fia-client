import Board from "./Board";
import DragMove from '../DragMove';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Game = ({ defaultPlayers }) => {
    const [boardPos, setBoardPos] = useState({ x: -60, y: 0 });
    const [boardSize, setBoardSize] = useState(2);

    const [playerCount, setPlayerCount] = useState(4);
    const [circleSize, setCircleSize] = useState(2);
    const [players, setPlayers] = useState(defaultPlayers);
    const [moveCount, setMoveCount] = useState(1);
    const [selectedPiece, setSelectedPiece] = useState(0);
    const [moveIndicator, setMoveIndicator] = useState([0]);

    const handleDragMove = (e) => {
        setBoardPos({
            x: boardPos.x + e.movementX,
            y: boardPos.y + e.movementY
        });
    };

    const updatePlayerCount = (e) => {
        if (e.target.value.length > 0) {
            setPlayerCount(parseInt(e.target.value));
        } else {
            setPlayerCount(0);
        }
    }

    const movePieceToPos = (username, pieceNr, newPiecePos) => {
        const player = players.find(p => p.username === username);
        const piece = player.pieces.find(p => p.number === pieceNr);

        players.forEach(player => { // går igenom alla spelare
            if (player.username !== username) { // kollar om spelaren inte är spelaren som går
                player.pieces.forEach(piece => { // går igenom spelarens pjäser
                    if (piece.position === newPiecePos) { // om pjäsen står på samma ruta som pjäsen som går hamnar på...
                        sendPieceHome(piece, player); // ...ska den skickas till sitt hem
                    }
                })
            }
        });

        // om spelaren har slagit en sexa och ska gå ut till första rutan ska två pjäser gås ut istället för bara en
        if (newPiecePos === player.playerNumber * 10 + 1 && moveCount === 6 && piece.position < player.playerNumber * -10 && piece.position > player.playerNumber * -10 - 5) {
            for (let i = 1; i <= 4; i++) { // loopar igenom alla fyra rutor i hemmet
                const pieceOnCircle = player.pieces.find(p => p.position === player.playerNumber * -10 - i); // den eventuella pjäsen som står på den rutan i hemmet
                if (pieceOnCircle && pieceOnCircle.position !== piece.position) { // går igenom spelarens pjäser och kollar om någon förutom den pjäs som ska flyttas står på den rutan i hemmet
                    player.pieces[pieceOnCircle.number].position = newPiecePos; // går ut med den pjäsen också
                    break;
                }
            }
        }
        player.pieces[pieceNr].position = newPiecePos;

        setPlayers([...players]);
        setSelectedPiece(0);
        setMoveIndicator([0]);
    }

    const sendPieceHome = (piece, player) => {
        for (let i = 1; i <= 4; i++) { // loopar igenom alla fyra rutor i hemmet
            if (!player.pieces.find(p => p.position === player.playerNumber * -10 - i)) { // går igenom spelarens pjäser och kollar om någon inte står på rutan i hemmet
                piece.position = player.playerNumber * -10 - i; // flyttar pjäsen till första rutan som är tom
                break;
            }
        }
    }

    const calcPos = (username, oldPos, moveAmount) => {
        const player = players.find(p => p.username === username);
        const playerNumber = player.playerNumber;
        let newPos = oldPos;
        let step = 1;

        if (oldPos < playerNumber * -10 && oldPos > playerNumber * -10 - 5) { // om pjäsen står i hemmet...
            if (moveAmount === 1) { // ...ska man gå till första rutan om man slår en etta
                const startCircle = playerNumber * 10 + 1;

                const change = moveOneStep(username, startCircle + 1, -1);
                if (!change) return [false];

                return [playerNumber * 10 + 1];
            } else if (moveAmount === 6) { // ...ska man gå till sjätte rutan med en pjäs eller första rutan med två pjäser om man slår en sexa
                const startCircle = playerNumber * 10 + 1;

                let change = moveOneStep(username, startCircle + 1, -1);
                if (!change) return [false]; // om den inte kan gå till första rutan kan den inte gå nånstans

                change = calcPos(username, startCircle, 5);
                if (!change[0]) return [playerNumber * 10 + 1]; // om den nu inte kan gå till sjätte rutan returnar den bara första rutan

                return [playerNumber * 10 + 6, playerNumber * 10 + 1]; // om ingen change är false returnar den både första och sjätte rutan
            }
        }

        for (let i = 0; i < Math.abs(moveAmount); i++) {
            const change = moveOneStep(username, newPos, step);
            step = change.step;
            newPos = change.pos;
            if (!change) return [false];
        }

        return newPos === playerNumber * -10 - 5 ? [-1] : [newPos]; // om newPos är cirkeln efter sista i mållinjen ska man hamna i målet annars på den uträknade positionen
    }

    const moveOneStep = (username, oldPos, step) => {
        const playerNumber = players.find(p => p.username === username).playerNumber;
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
            if (newPos === playerNumber * 10 + 1 && step > 0) {// om man har gått hela varvet går man in i mållinjen
                newPos = playerNumber * -10 - 9;
            }
        }

        if (newPos === -(playerNumber * 10 + 10)) { // om man backat ut ur mållinjen ska man tillbaka till banan
            newPos = moveOneStep(username, playerNumber * 10 + 1, -1).pos;
        }

        if (playerNumber !== undefined) {
            const ownPiecesInPath = players.find(p => p.username === username).pieces.filter(p => p.position === newPos);
            const notThisPieceInPath = ownPiecesInPath.find(p => p.number !== selectedPiece.number);
            if (notThisPieceInPath !== undefined) { // det ska inte gå att gå förbi en av sina egna spelpjäser
                return false;
            }
        }

        return { pos: newPos, step: step }; // pos är ett steg i riktningen step
    }

    useEffect(() => {
        if (selectedPiece !== 0) {
            const player = players.find(p => p.playerNumber === selectedPiece.playerNumber);
            const targetStepCircle = calcPos(player.username, selectedPiece.position, moveCount);
            setMoveIndicator(targetStepCircle ? targetStepCircle : 0);
        } else {
            setMoveIndicator([0]);
        }
    }, [selectedPiece, moveCount]);

    const rollDice = () => {
        axios.get(`http://localhost:4000/dice`)
            .then(res => {
                setMoveCount(res.data);
                console.log(players);
            });
    }

    return (
        <div>
            <div className="container position-absolute" style={{
                right: '25%',
                top: '12.5%',
                width: '50vw',
                height: '75h',
            }}>
                <div className="row">
                    <div className="col" style={{
                        borderRight: 'black solid',
                        width: '100vw',
                        height: '75vh',
                    }}>
                        <div className='position-absolute' style={{
                            top: '50%',
                            right: '50%',
                            transform: `scale(${boardSize})`,
                        }}>
                            <DragMove onDragMove={handleDragMove}>
                                <div style={{
                                    transform: `translateX(${boardPos.x}px) translateY(${boardPos.y}px)`
                                }}>
                                    <Board movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} playerCount={playerCount} circleSize={circleSize} players={players} />
                                </div>
                            </DragMove>
                        </div>

                    </div>

                    <div className="col position-absolute" style={{
                        width: '40px',
                        height: '100%',
                        right: '-12%',
                    }}>
                        <label className="form-label" htmlFor="zoomInput">Zoom</label>
                        <input
                            type='range'
                            onChange={e => { setBoardSize(e.target.value) }}
                            defaultValue={boardSize}
                            min={0.1}
                            max={6}
                            step={0.2}
                            id="zoomInput"
                            orient="vertical"
                            style={{
                                writingMode: 'bt-lr',
                                WebkitAppearance: 'slider-vertical',
                                width: '8px',
                                height: '100%',
                                padding: '0 5px',
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                </div>
            </div >
            Antal spelare:
            <input value={playerCount} onChange={e => { updatePlayerCount(e) }}></input>
            <br />
            Storlek:
            <input value={circleSize} onChange={e => { setCircleSize(e.target.value) }}></input>
            <br />
            Pjäs 1:
            <input value={players[0].pieces[0].position} onChange={e => { movePieceToPos('gustav', 0, parseInt(e.target.value)) }}></input>
            <br />
            Pjäs 2:
            <input value={players[0].pieces[1].position} onChange={e => { movePieceToPos('gustav', 1, parseInt(e.target.value)) }}></input>
            <br />
            Pjäs 3:
            <input value={players[0].pieces[2].position} onChange={e => { movePieceToPos('gustav', 2, parseInt(e.target.value)) }}></input>
            <br />
            Pjäs 4:
            <input value={moveCount} onChange={e => { setMoveCount(e.target.value) }} size='1'></input>
            <input value={players[0].pieces[3].position} onChange={e => { movePieceToPos('gustav', 3, parseInt(e.target.value)) }} size='10'></input>
            <br />
            <button onClick={rollDice}>Slå tärning</button>
        </div>
    );
}

export default Game;
