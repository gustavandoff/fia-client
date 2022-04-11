import Board from "./Board";
import Dice from "./Dice";
import PlayerList from "./PlayerList";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Game = ({ currentUser, setCurrentUser, game, setGame, socket, initSocket }) => {
    const [players, setPlayers] = useState(game.players);
    const [moveCount, setMoveCount] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(0); // pjäsen man tryckt på
    const [moveIndicator, setMoveIndicator] = useState([0]); // markörerna som visar var man kan gå med pjäsen

    const circleSize = 2;
    const playerCount = Object.keys(game.players).length >= 4 ? Object.keys(game.players).length : 4;

    useEffect(() => {
        initSocket(); // skapar socket

        socket.on('updateGamePlayers', (data) => {
            setPlayers(data);
        });
    }, []);

    // tar fram skärmens/webbläsarens storlek
    const hasWindow = typeof window !== 'undefined';

    const getWindowDimensions = () => {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);
    //

    useEffect(() => {
        setPlayers(game.players);
    }, [game]);

    const movePieceToPos = async (username, pieceNr, newPiecePos) => {
        const player = players[username];
        const piece = player.pieces.find(p => p.number === pieceNr);

        Object.keys(players).forEach(u => { // går igenom alla spelare
            if (u !== username) { // kollar om spelaren inte är spelaren som går
                players[u].pieces.forEach(p => { // går igenom spelarens pjäser
                    if (p.position && p.position === newPiecePos) { // om pjäsen står på samma ruta som pjäsen som går hamnar på...
                        sendPieceHome(p, players[u]); // ...ska den skickas till sitt hem
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

        setPlayers({ ...players });
        setSelectedPiece(0);
        setMoveIndicator([0]);

        let nextTurn = true;
        if (newPiecePos === -1 /*|| moveCount === 6*/) {
            /* newPiecePos är -1 då målgångsanimationen börjar köras,
            på sexor får man slå igen */
            nextTurn = false;
        }

        await socket.emit('updateGameBoard', {
            game,
            user: currentUser,
            players,
            nextTurn
        });
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
        const player = players[username];
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
            } else {
                return [false];
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
        const playerNumber = players[username].playerNumber;
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
            const ownPiecesInPath = players[username].pieces.filter(p => p.position === newPos);
            const notThisPieceInPath = ownPiecesInPath.find(p => p.number !== selectedPiece.number);
            if (notThisPieceInPath !== undefined) { // det ska inte gå att gå förbi en av sina egna spelpjäser
                return false;
            }
        }

        return { pos: newPos, step: step }; // pos är ett steg i riktningen step
    }

    // kollar om spelaren kan gå med någon pjäs
    const checkIfCurrentUserCanMove = () => {
        if (!moveCount) return true;

        let canMove = false;

        const thisPlayer = players[Object.keys(players).find(u => u === currentUser.username)]; // kollar om användaren är med i spelet
        if (!thisPlayer) {
            return false;
        }

        Object.keys(thisPlayer.pieces).forEach(p => { // går igenom spelarens pjäser
            const thisPiecePosition = thisPlayer.pieces[p].position;
            if (thisPiecePosition) { // om pjäsen har en position dvs den har inte gått ut
                if (calcPos(currentUser.username, thisPiecePosition, moveCount)[0]) { // kollar om pjäsen kan gå
                    canMove = true;
                }
            }
        });

        return canMove;
    }

    useEffect(() => {
        const emitUpdateGameBoard = async () => {
            await socket.emit('updateGameBoard', {
                game,
                user: currentUser,
                players,
                nextTurn: true
            });
        }

        if (!moveCount) {
            setSelectedPiece(0);
        }

        if (game.turn === currentUser.username && !checkIfCurrentUserCanMove()) { // om det är användarens tur och den inte kan gå
            emitUpdateGameBoard(); // det blir nästas tur
        }

        if (selectedPiece !== 0) {
            const username = Object.keys(players).find(username => players[username].playerNumber === selectedPiece.playerNumber); // användaren som tryckt på en pjäs
            const targetStepCircle = calcPos(username, selectedPiece.position, moveCount); // de rutorna där pjäsen kan gå
            setMoveIndicator(targetStepCircle ? targetStepCircle : 0);
        } else {
            setMoveIndicator([0]);
        }
    }, [selectedPiece, moveCount]);

    const RollDiceButton = () => {
        axios.get(`http://${window.location.hostname}:4000/gameDiceRoll/${game.gameName}`)
            .then(res => {
                setMoveCount(res.data);
            });

        if (game.turn === currentUser.username) {
            return <Dice windowDimensions={windowDimensions} currentDiceRoll={moveCount} setCurrentDiceRoll={setMoveCount} socket={socket} game={game} />
        }
        else {
            return '';
        }
    }

    return (
        <div className="position-relative pe-none vh-100 text-center">
            <div className="position-relative d-flex justify-content-center align-items-center">
                <div>
                    <div className="d-flex pe-auto justify-content-center">
                        <Board windowDimensions={windowDimensions} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} playerCount={playerCount} circleSize={circleSize} game={game} currentUser={currentUser} />
                    </div>

                    <RollDiceButton />

                </div>
            </div >

            <PlayerList players={players} game={game} windowDimensions={windowDimensions} />

        </div>

    );
}

export default Game;
