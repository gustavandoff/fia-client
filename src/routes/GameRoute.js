import Game from '../components/Game/Game';
import GameLobby from '../components/Game/GameLobby';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

const GameRoute = ({ currentUser, setCurrentUser }) => {
    const [game, setGame] = useState(null);
    const [renderedGame, setRenderedGame] = useState();
    let params = useParams();
    const { gameName } = params;
    const navigate = useNavigate();

    const WAITING = 'WAITING';
    const PLAYING = 'PLAYING';
    const FINISHED = 'FINISHED';

    if (!game) {
        axios
            .get(`http://localhost:4000/games/${gameName}`)
            .then(res => {
                console.log(res.data);
                setGame(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!game) return;
        const { status } = game;
        if (status === WAITING) {
            return setRenderedGame(<GameLobby game={game} />);
        }
        if (status === PLAYING) {
            return setRenderedGame(<Game defaultPlayers={defaultPlayers} />);
        }
        if (status === FINISHED) {

        }

        setRenderedGame(<Game defaultPlayers={defaultPlayers} />);
    }, [game]);


    let defaultPlayers = [
        {
            username: 'gustav',
            playerNumber: 1,
            color: 'red',
            pieces: [
                {
                    number: 0,
                    position: -11,
                },
                {
                    number: 1,
                    position: -12,
                },
                {
                    number: 2,
                    position: -13,
                },
                {
                    number: 3,
                    position: 15,
                }
            ]
        },
        {
            username: 'gun',
            playerNumber: 2,
            color: 'yellow',
            pieces: [
                {
                    number: 0,
                    position: -21,
                },
                {
                    number: 1,
                    position: -22,
                },
                {
                    number: 2,
                    position: -23,
                },
                {
                    number: 3,
                    position: -24,
                }
            ]
        }
    ];

    return (
        <div className="App">
            {renderedGame}
        </div>
    );
}

export default GameRoute;
