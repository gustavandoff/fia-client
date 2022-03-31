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

    let genitiveCurrentUserDisplayname = 'gästs';
    if (currentUser) {
        if (currentUser.username.slice(-1) === 's' || currentUser.username.slice(-1) === 'x' || currentUser.username.slice(-1) === 'z') {
            genitiveCurrentUserDisplayname = currentUser.username;
        } else {
            genitiveCurrentUserDisplayname = currentUser.username + 's';
        }
    }

    const [gameName, setGameName] = useState(genitiveCurrentUserDisplayname + ' spel');

    if (!currentUser) {
        return navigate('/')
    }

    const handleMaxPlayersInput = e => {
        setMaxPlayers(e.target.value);
    }

    const handleGameNameInput = e => {
        setGameName(e.target.value);
    }

    const joinGame = () => {
        axios
            .post(`http://localhost:4000/joingame`, {
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
            .post(`http://localhost:4000/games`, {
                gameName: gameName,
                maxPlayers: maxPlayers
            })
            .then(res => {
                console.log('created game', gameName);
                joinGame();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Skapa nytt spel'>
                <FormTextInput defaultValue={genitiveCurrentUserDisplayname + ' spel'} handleInputFunction={handleGameNameInput} type='text' label='Spelnamn' id='typeNameX' />
                <FormRangeInput label='Max antal spelare' handleInputFunction={handleMaxPlayersInput} min={4} max={12} step={1} id='rangeMaxPlayersX' />
                <FormSubmitButton onClick={createGame} text='Skapa' />
            </Form>
        </div>


    );
}

export default CreateGame;