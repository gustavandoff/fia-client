import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import Navbar from "../components/Header/Navbar";
import Form from "../components/Form/Form";
import FormSelectInput from "../components/Form/FormSelectInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";

const JoinGame = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState();
    const [gameList, setGameList] = useState();
    const [selectedGame, setSelectedGame] = useState();

    const handleSelectedGameInput = value => {
        setSelectedGame(value);
    }

    const joinGame = () => {
        axios
            .post(`http://localhost:4000/joingame`, {
                username: currentUser ? currentUser.username : 'gäst',
                gameName: selectedGame
            })
            .then(res => {
                console.log("joined game:", selectedGame);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const refreshGames = () => {
        axios
            .get(`http://localhost:4000/games`)
            .then(res => {
                setGames(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!games) return;
        setGameList(Object.keys(games));
    }, [games]);

    if (!games) {
        refreshGames();
    }

    let renderGames = [];
    gameList?.forEach((e, i) => {
        renderGames.push(<li key={i}>{e}</li>);
    });

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Gå med'>
                <FormSelectInput label='Spel' handleInputFunction={handleSelectedGameInput} activeValue={selectedGame} values={gameList} />
                <FormSubmitButton onClick={joinGame} text='Gå med' />
            </Form>
        </div>


    );
}

export default JoinGame;