import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import Navbar from "../components/Header/Navbar";
import Form from "../components/Form/Form";
import FormSelectInput from "../components/Form/FormSelectInput";
import FormTextInput from "../components/Form/FormTextInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import FormRangeInput from "../components/Form/FormRangeInput";

const CreateGame = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [gameName, setGameName] = useState();
    const [errorMessage, setErrorMessage] = useState();

    let genitiveCurrentUserUsername = '';

    useEffect(() => {
        if (currentUser) {
            if (currentUser.username.slice(-1) === 's' || currentUser.username.slice(-1) === 'x' || currentUser.username.slice(-1) === 'z') {
                genitiveCurrentUserUsername = currentUser.username;
            } else {
                genitiveCurrentUserUsername = currentUser.username + 's';
            }

            setGameName(genitiveCurrentUserUsername + ' spel');
        } else {
            return navigate('/');
        }
    }, []);

    const handleMaxPlayersInput = e => {
        setMaxPlayers(e.target.value);
    }

    const handleGameNameInput = e => {
        setGameName(e.target.value);
    }

    const joinGame = () => {
        axios
            .post(`http://${window.location.hostname}:4000/joingame`, {
                username: currentUser.username,
                gameName: gameName
            })
            .then(res => {
                navigate('/games/' + gameName)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const createGame = () => {
        if (!maxPlayers || !gameName) {
            return;
        }

        axios
            .post(`http://${window.location.hostname}:4000/games`, {
                gameName: gameName,
                maxPlayers: maxPlayers
            })
            .then(res => {
                console.log('created game', gameName);
                joinGame();
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            });
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Skapa nytt spel'>
                <FormTextInput defaultValue={gameName} handleInputFunction={handleGameNameInput} type='text' label='Spelnamn' id='typeNameX' errorMessage={errorMessage} />
                <FormRangeInput label='Max antal spelare' handleInputFunction={handleMaxPlayersInput} min={1} max={12} defaultValue={4} step={1} id='rangeMaxPlayersX' />
                <FormSubmitButton onClick={createGame} text='Skapa' />
            </Form>
        </div>


    );
}

export default CreateGame;