import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import Navbar from "../components/Header/Navbar";
import Form from "../components/Form/Form";
import FormSelectInput from "../components/Form/FormSelectInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import FormListInput from "../components/Form/FormListInput";

const JoinGame = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState();
    const [gamesArray, setGamesArray] = useState();
    const [gamesPlayerInfoArray, setGamesPlayerInfoArray] = useState();
    const [selectedGame, setSelectedGame] = useState();

    const handleSelectedGameInput = value => {
        setSelectedGame(value);
    }

    const joinGame = () => {
        if (!selectedGame) return;
        axios
            .post(`http://localhost:4000/joingame`, {
                username: currentUser ? currentUser.username : 'gäst',
                gameName: selectedGame
            })
            .then(res => {
                navigate('/' + selectedGame)
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
                if (Object.keys(res.data).length === 0) {
                    setGamesArray([]);
                    setGamesPlayerInfoArray([]);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!games) return;
        let tempGamesPlayerInfoArray = [];
        Object.keys(games).forEach((e, i) => {
            tempGamesPlayerInfoArray.push(Object.keys(games[e].players).length + '/' + games[e].maxPlayers);
        });
        setGamesPlayerInfoArray(tempGamesPlayerInfoArray);
        setGamesArray(Object.keys(games));
    }, [games]);

    if (!games) {
        refreshGames();
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Gå med i spel'>
                <FormListInput nothingFoundMessage='Hittar inga spel...' handleInputFunction={handleSelectedGameInput} activeValue={selectedGame} values={gamesArray} valuesInfo={gamesPlayerInfoArray} refreshFunction={refreshGames} />
                <FormSubmitButton onClick={joinGame} text='Gå med' />
            </Form>
        </div>


    );
}

export default JoinGame;