import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const GameLobby = ({ currentUser, setCurrentUser, game, setGame, socket, initSocket }) => {
    const [takenColors, setTakenColors] = useState([]);
    const [canStart, setCanStart] = useState(false);
    const navigate = useNavigate();

    const isInGame = () => {
        return !!game.players[currentUser.username];
    }

    useEffect(() => {
        initSocket();
    }, []);

    useEffect(() => {
        let tempTakenColors = [];
        let everyoneIsReady = true;
        Object.keys(game.players).forEach((e) => {
            if (game.players[e].color) {
                tempTakenColors.push(game.players[e].color);
            }
            if (!game.players[e].ready) {
                everyoneIsReady = false;
            }
        });

        if (takenColors.length === Object.keys(game.players).length) {
            setCanStart(everyoneIsReady);
        }

        setTakenColors(tempTakenColors);
    }, [game]);

    const colorClicked = async (color) => {
        if (!isInGame()) return;

        if (takenColors.includes(color)) return;

        await socket.emit('gameLobbyPickColor', {
            user: currentUser,
            game: game,
            color: color
        });
    }

    const toggleReady = async () => {
        await socket.emit('toggleReady', {
            user: currentUser,
            game: game,
        });
    }

    const leaveGame = async () => {
        if (!isInGame()) return navigate('/');

        await socket.emit('leaveGame', {
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
            const src = require(`../../assets/images/pieces/${color}.png`)

            let disabledClassName = 'lobby-piece-selectable';

            if (takenColors.find(e => e === color)) {
                disabledClassName = 'lobby-piece-disabled';
            }

            if (!isInGame()) {
                disabledClassName = '';
            }

            return (
                <img onClick={() => colorClicked(color)} className={`m-1 lobby-piece ${disabledClassName}`} src={src}></img>
            );
        }

        let renderColors = [];
        colors.forEach((e, i) => {
            renderColors.push(<Color key={i} color={e} />);
        });

        return (
            <div>
                {renderColors}
            </div>
        );
    }

    const PlayerListItem = ({ player }) => {

        let generalClassName = '';
        let playerColor = player.color;
        if (!playerColor) {
            generalClassName = 'lobby-piece-general';
            playerColor = 'red';
        }

        const src = require(`../../assets/images/pieces/${playerColor}.png`)
        const isReadyClass = !!player.ready;

        return (
            <li className="list-group-item bg-secondary rounded-pill m-1 w-30">
                <div className="float-start d-flex align-items-center justify-content-center">
                    <div className={`ready-indicator ready-indicator-${isReadyClass} bg-col-primary me-2`} />
                    {player.username}
                </div>
                <div className="float-end">
                    <img src={src} className={`lobby-player-piece lobby-piece-icon ${generalClassName}`} />
                </div>
            </li>
        );
    }

    let renderPlayers = [];
    Object.keys(game.players).forEach((e, i) => {
        renderPlayers.push(<PlayerListItem key={i} player={game.players[e]} />);
    });

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-75">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="card bg-col-primary text-col-primary" style={{ borderRadius: '2rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-2">
                                    <h2 className="fw-bold mb-5 text-uppercase">{game.gameName}</h2>

                                    <div className="text-start">
                                        <h3 className="w-75 border-bottom">Välj färg</h3>
                                        <ColorPicker />
                                    </div>
                                    <div className="row text-start">
                                        <h3 className="w-75 border-bottom">Spelare</h3>
                                        {renderPlayers}
                                    </div>

                                    <button onClick={leaveGame} className={`position-absolute start-0 btn btn-outline-light btn-lg bg-col-secondary text-col-secondary px-5 ms-5 mt-4`}>Lämna spelet</button>
                                    <button onClick={isInGame() ? (canStart ? startGame : toggleReady) : () => { }} className={`position-absolute end-0 btn btn-outline-light btn-lg bg-col-secondary ${!game.players[currentUser.username].color ? 'disabled' : ''} text-col-secondary px-5 me-5 mt-4`}>{game.players[currentUser.username].ready ? (canStart ? 'Starta' : 'Inte Redo') : 'Bli redo'}</button>
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