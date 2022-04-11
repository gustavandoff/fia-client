import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import Navbar from "../components/Header/Navbar";
import Form from "../components/Form/Form";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import FormListInput from "../components/Form/FormListInput";

// Där man kan gå med eller titta på alla spel
const JoinGame = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState();
    const [gamesArray, setGamesArray] = useState(); // alla spelen
    const [gamesPlayerInfoArray, setGamesPlayerInfoArray] = useState(); // antalet spelare i varje spel / max antal spelare. t.ex. 2/5
    const [gamesStatusArray, setGamesStatusArray] = useState(); // alla spelens status
    const [selectedGame, setSelectedGame] = useState();
    const [errorMessage, setErrorMessage] = useState();

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
        Object.keys(games).forEach((e, i) => { // går igenom alla spelen
            tempGamesPlayerInfoArray.push(Object.keys(games[e].players).length + '/' + games[e].maxPlayers); // antalet spelare i spelet / max antal spelare
            switch (games[e].status) { // beroende på status visas olika meddelanden
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
                setErrorMessage(error.response.data);
            });
    }

    const refreshGames = () => { // uppdaterar listan med spel från servern
        axios
            .get(`http://${window.location.hostname}:4000/games`)
            .then(res => {
                setSelectedGame(null);
                setGames(res.data);
                setErrorMessage('');
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

    const JoinGameButton = () => {
        let disabled = true; // innan man valt ett spel ska "Gå med"-knappen vara avaktiverad
        let title = 'Välj ett av spelen'; // denna text visas när man hållar musen över knappen
        if (selectedGame) { // om något spel är valt
            disabled = false;
            title = '';
            if (Object.keys(games[selectedGame].players).length === games[selectedGame].maxPlayers) { // om antal spelare i spelet är lika mycket som spelets max antal spelare
                disabled = true;
                title = 'Max antal spelare uppnått';
            }
            if (games[selectedGame].status !== "WAITING") { // om spelet inte väntar på att startas dvs det är igång
                disabled = true;
                title = 'Spelet är redan igång';
            }
            if (games[selectedGame].players[currentUser.username]) { // om currentUser är med i spelet
                disabled = false;
                title = '';
            }
        }

        return (
            <FormSubmitButton onClick={joinGame} disabled={disabled} title={title} text='Gå med' />
        )
    }

    const SpectateGameButton = () => {
        let disabled = false;
        let title = '';
        if (!selectedGame) {
            disabled = true;
            title = 'Välj ett av spelen';
        }

        return (
            <FormSubmitButton onClick={spectateGame} disabled={disabled} title={title} text='Titta på' />
        )
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Gå med i spel'>
                <FormListInput nothingFoundMessage='Hittar inga spel...' handleInputFunction={(value) => setSelectedGame(selectedGame === value ? null : value)} activeValue={selectedGame} values={gamesArray} valuesInfoRight={gamesPlayerInfoArray} valuesInfoBottom={gamesStatusArray} refreshFunction={refreshGames} errorMessage={errorMessage} />
                <span className='mx-4'>
                    <JoinGameButton />
                </span>
                <span className='mx-4'>
                    <SpectateGameButton />
                </span>
            </Form>
        </div>


    );
}

export default JoinGame;