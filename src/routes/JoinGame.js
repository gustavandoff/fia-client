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
    const [gamesStatusArray, setGamesStatusArray] = useState();
    const [selectedGame, setSelectedGame] = useState();

    useEffect(() => {
        if (!currentUser) {
            return navigate('/')
        }
        if (!games) {
            refreshGames();
            return;
        }
        let tempGamesPlayerInfoArray = [];
        let tempGameStatusArray = [];
        Object.keys(games).forEach((e, i) => {
            tempGamesPlayerInfoArray.push(Object.keys(games[e].players).length + '/' + games[e].maxPlayers);
            switch (games[e].status) {
                case 'WAITING':
                    tempGameStatusArray.push('Väntar på att startas');
                    break;
                case 'PLAYING':
                    tempGameStatusArray.push('Spelet är igång');
                    break;
            }

        });
        setGamesPlayerInfoArray(tempGamesPlayerInfoArray);
        setGamesStatusArray(tempGameStatusArray);
        setGamesArray(Object.keys(games));
    }, [games]);



    const spectateGame = () => {
        if (!selectedGame) return;

        navigate('/games/' + selectedGame);
    }

    const joinGame = () => {
        if (!selectedGame) return;
        axios
            .post(`http://${window.location.hostname}:4000/joingame`, {
                username: currentUser.username,
                gameName: selectedGame
            })
            .then(res => {
                navigate('/games/' + selectedGame)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const refreshGames = () => {
        axios
            .get(`http://${window.location.hostname}:4000/games`)
            .then(res => {
                setGames(res.data);
                if (Object.keys(res.data).length === 0) {
                    setGamesArray([]);
                    setGamesPlayerInfoArray([]);
                    setGamesStatusArray([]);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Gå med i spel'>
                <FormListInput nothingFoundMessage='Hittar inga spel...' handleInputFunction={setSelectedGame} activeValue={selectedGame} values={gamesArray} valuesInfoRight={gamesPlayerInfoArray} valuesInfoBottom={gamesStatusArray} refreshFunction={refreshGames} />
                <span className='mx-4'>
                    <FormSubmitButton onClick={joinGame} text='Gå med' />
                </span>
                <span className='mx-4'>
                    <FormSubmitButton onClick={spectateGame} text='Titta på spelet' />
                </span>
            </Form>
        </div>


    );
}

export default JoinGame;