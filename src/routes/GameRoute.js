import Game from '../components/Game/Game';
import GameLobby from '../components/Game/GameLobby';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

const socket = io('ws://localhost:4000');

const GameRoute = ({ currentUser, setCurrentUser }) => {
    const [game, setGame] = useState(null);
    const [renderedGame, setRenderedGame] = useState();

    const navigate = useNavigate();
    let params = useParams();
    const { gameName } = params;

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
    }

    useEffect(() => {
        initSocket();

        if (!gameName) {
            return navigate('/');
        }

        axios
            .get(`http://localhost:4000/games/${gameName}`)
            .then(res => {
                console.log('axios get game:', res.data);
                setGame(res.data);
                socket.emit('joinGame', res.data.gameName);
            })
            .catch(error => {
                console.error(error);
                return navigate('/joingame');
            });
    }, []);

    useEffect(() => {
        if (!game) return;
        const { status } = game;
        if (status === WAITING) {
            return setRenderedGame(<GameLobby currentUser={currentUser} setCurrentUser={setCurrentUser} game={game} setGame={setGame} socket={socket} initSocket={initSocket} />);
        }
        if (status === PLAYING) {
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
