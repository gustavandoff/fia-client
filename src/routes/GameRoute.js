import Game from '../components/Game/Game';
import GameLobby from '../components/Game/GameLobby';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

const socket = io(`ws://${window.location.hostname}:4000`);

// Om man är inne i ett spel hamnar man här
const GameRoute = ({ currentUser, setCurrentUser }) => {
    const [game, setGame] = useState(null);
    const [renderedGame, setRenderedGame] = useState(); // det som visas på skärmen

    const navigate = useNavigate();
    let params = useParams();
    const { gameName } = params; // spelnamnet från URL:n

    const WAITING = 'WAITING';
    const PLAYING = 'PLAYING';
    const FINISHED = 'FINISHED';

    const initSocket = () => {
        socket.on("error", (error) => {
            console.error(error);
        });

        socket.on('updateGame', (data) => {
            if (game && game.gameName === data.gameName) {
                setGame(data);
            }
        });

        axios
            .get(`http://${window.location.hostname}:4000/games/${gameName}`)
            .then(res => {
                setGame(res.data);
                socket.emit('joinGame', res.data.gameName);
            })
            .catch(error => {
                return navigate('/joingame');
            });
    }

    useEffect(() => {
        if (!gameName) return navigate('/');

        initSocket();
    }, []);

    useEffect(() => {
        if (!game) return;
        const { status } = game;
        if (status === WAITING) { // om spelet inte har startats ritas spellobbyn ut
            return setRenderedGame(<GameLobby currentUser={currentUser} setCurrentUser={setCurrentUser} game={game} setGame={setGame} socket={socket} initSocket={initSocket} />);
        }
        if (status === PLAYING) { // om spelet är igång ritas spelplanen ut
            return setRenderedGame(     <Game currentUser={currentUser} setCurrentUser={setCurrentUser} game={game} setGame={setGame} socket={socket} initSocket={initSocket} />);
        }
        if (status === FINISHED) {

        }
    }, [game]);

    return (
        <div className="App">
            {renderedGame}
        </div>
    );
}

export default GameRoute;
