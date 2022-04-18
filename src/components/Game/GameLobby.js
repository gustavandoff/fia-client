import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

// Där man hamnar innan spelet startar
const GameLobby = ({ currentUser, setCurrentUser, game, setGame, socket, initSocket }) => {
    const [takenColors, setTakenColors] = useState([]); // de färger som någon redan har valt
    const [canStart, setCanStart] = useState(false); // true eller false beroende på om man ska kunna starta spelet
    const navigate = useNavigate();

    const isInGame = () => {
        if (!currentUser) return false;
        return !!game.players[currentUser.username]; // true eller false beroende på om användaren är med i spelet
    }

    useEffect(() => {
        initSocket(); // skapar socket
    }, []);

    useEffect(() => {
        let tempTakenColors = [];
        let everyoneIsReady = true;
        Object.keys(game.players).forEach((e) => { // går igenom alla spelare i spelet
            if (game.players[e].color) { // om spelaren har valt en färg
                tempTakenColors.push(game.players[e].color); // ska färgen läggas till en array
            }
            if (!game.players[e].ready) { // om spelaren är redo
                everyoneIsReady = false;
            }
        });

        if (takenColors.length === Object.keys(game.players).length) { // om alla har valt en färg
            setCanStart(everyoneIsReady);
        }

        setTakenColors(tempTakenColors);
    }, [game]);

    const colorClicked = async (color) => {
        if (!isInGame()) return;

        if (takenColors.includes(color)) return; // om färgen man tryckt på redan är tagen av någon annan

        await socket.emit('gameLobbyPickColor', { // skickar färgbytet i socketen
            user: currentUser,
            game: game,
            color: color
        });
    }

    const toggleReady = async () => {
        await socket.emit('toggleReady', { // växlar mellan att vara redo och inte
            user: currentUser,
            game: game,
        });
    }

    const leaveGame = async () => {
        if (!isInGame()) return navigate('/');

        await socket.emit('leaveGame', { // lämnar spelet
            user: currentUser,
            game: game,
        });

        navigate('/');
    }

    const startGame = async () => {
        if (!isInGame()) return navigate('/'); // ifall man av någon anledning skulle lyckas nå hit utan att vara med i splet

        if (canStart && takenColors.length === Object.keys(game.players).length) {
            await socket.emit('startGame', {
                user: currentUser,
                game: game,
            });
        }
    }

    const ColorPicker = () => {
        const colors = [];

        if (!isInGame()) return '';

        colors.push('blue');
        colors.push('cyan');
        colors.push('darkgreen');
        colors.push('darkorange');
        colors.push('darkred');
        colors.push('deepskyblue');
        colors.push('green');
        colors.push('grey');
        colors.push('hotpink');
        colors.push('indigo');
        colors.push('lime');
        colors.push('purple');
        colors.push('red');
        colors.push('saddlebrown');
        colors.push('whitesmoke');
        colors.push('yellow');

        const Color = ({ color }) => {
            const src = require(`../../assets/images/pieces/${color}.png`) // pjäsbilden

            let disabledClassName = 'lobby-piece-selectable';

            if (takenColors.find(e => e === color)) { // om färgen redan är tagen
                disabledClassName = 'lobby-piece-disabled';
            }

            if (!isInGame()) {
                disabledClassName = '';
            }

            return (
                <img onClick={() => colorClicked(color)} className={`m-1 lobby-piece ${disabledClassName}`} src={src} alt={color}></img>
            );
        }

        let renderColors = [];
        colors.forEach((e, i) => {
            renderColors.push(<Color key={i} color={e} />);
        });

        return (
            <div className="text-start">
                <h3 className="w-75 border-bottom">Välj färg</h3>
                {renderColors}
            </div>
        );
    }

    const PlayerListItem = ({ player }) => { // varje spelare som är med i spelet
        const playerColor = player.color ? player.color : 'default';

        const src = require(`../../assets/images/pieces/${playerColor}.png`)
        const isReadyClass = !!player.ready;

        return (
            <li className="list-group-item bg-secondary rounded-pill m-1 w-30">
                <div className="float-start d-flex align-items-center justify-content-center">
                    <div className={`ready-indicator ready-indicator-${isReadyClass} bg-col-primary me-2`} />
                    {player.username}
                </div>
                <div className="float-end">
                    <img src={src} alt={playerColor} className={`lobby-player-piece lobby-piece-icon`} />
                </div>
            </li>
        );
    }

    const joinGame = () => {
        axios
            .post(`http://${window.location.hostname}:4000/joingame`, {
                username: currentUser.username,
                gameName: game.gameName
            })
            .then(res => {
                navigate('/games/' + game.gameName);
                setGame(res.data);
                socket.emit('joinGame', res.data.gameName);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // knappen där man antingen växlar om man är redo eller där man trycker för att gå med om man bara tittar på spelet
    const ReadyJoinButton = () => {
        if (!currentUser) return '';
        const thisPlayer = game.players[currentUser.username];
        if (!isInGame()) // är man inte med i spelet kan man trycka på knappen för att gå med
            return <button onClick={joinGame} className={`position-absolute end-0 btn btn-outline-light btn-lg bg-col-secondary text-col-secondary px-4 me-5 mt-4`}>Gå med i spel</button>

        return (
            <button onClick={toggleReady} title={!thisPlayer.color ? 'Du måste välja en färg' : ''} className={`position-absolute end-0 btn btn-outline-light btn-lg bg-col-secondary ${!thisPlayer.color ? 'disabled pe-auto cursor-default' : ''} text-col-secondary px-4 me-5 mt-4`}>{thisPlayer.ready ? 'Inte Redo' : 'Bli redo'}</button>
        )
    }

    const StartButton = () => {
        if (!isInGame()) return '';

        return <button onClick={canStart ? startGame : () => { }} title={!canStart ? 'Alla är inte redo' : ''} className={`position-relative btn btn-outline-light btn-lg bg-col-secondary ${!canStart ? 'disabled pe-auto cursor-default' : ''} text-col-secondary px-5 mt-4`}>Starta</button>
    }

    let renderPlayers = [];
    Object.keys(game.players).forEach((e, i) => { // går igenom alla spelare i spelet
        renderPlayers.push(<PlayerListItem key={i} player={game.players[e]} />);
    });

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-75">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="card bg-col-primary text-col-primary" style={{ borderRadius: '2rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className={`${!isInGame() ? 'mb-5' : ''} mt-md-4 pb-2`}>
                                    <h2 className="fw-bold mb-5 text-uppercase">{game.gameName}</h2>

                                    <ColorPicker />

                                    <div className="row text-start mt-4 mb-3">
                                        <h3 className="w-75 border-bottom">Spelare {Object.keys(game.players).length + '/' + game.maxPlayers}</h3>
                                        {renderPlayers}
                                    </div>

                                    <button onClick={leaveGame} className={`position-absolute start-0 btn btn-outline-light btn-lg bg-col-secondary text-col-secondary px-4 ms-5 mt-4`}>Lämna</button>
                                    <StartButton />
                                    <ReadyJoinButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GameLobby;