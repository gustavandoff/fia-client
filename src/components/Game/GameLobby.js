import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client'
import axios from 'axios';


const GameLobby = ({ currentUser, setCurrentUser, game }) => {
    const [takenColors, setTakenColors] = useState([]);
    const socket = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        socket.current = io("ws://localhost:4000");

        socket.current.on("connnection", () => {
            console.log("connected to server");
        });
    }, []);

    useEffect(() => {
        const tempTakenColors = [];
        Object.keys(game.players).forEach((e) => {
            if (game.players[e].color) {
                tempTakenColors.push(game.players[e].color);
            }
        })
        setTakenColors(tempTakenColors);
    }, [game]);

    const colorClicked = (color) => {
        socket.current.emit('message', 'detta kanske är ett meddelande');
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

        return (
            <li className="list-group-item bg-secondary w-50">
                <div className="float-start">
                    {player.displayname}
                </div>
                <div className="float-end">
                    <img src={src} className={`lobby-piece lobby-piece-icon ${generalClassName}`} />
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