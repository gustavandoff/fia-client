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

    let genitiveCurrentUserUsername = 'gästs';
    if (currentUser) {
        if (currentUser.username.slice(-1) === 's' || currentUser.username.slice(-1) === 'x' || currentUser.username.slice(-1) === 'z') {
            genitiveCurrentUserUsername = currentUser.username;
        } else {
            genitiveCurrentUserUsername = currentUser.username + 's';
        }
    }

    const [gameName, setGameName] = useState(genitiveCurrentUserUsername + ' spel');

    const handleMaxPlayersInput = e => {
        setMaxPlayers(e.target.value);
    }

    const handleGameNameInput = e => {
        setGameName(e.target.value);
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
                axios
                    .post(`http://localhost:4000/joingame`, {
                        username: currentUser ? currentUser.username : 'gäst',
                        gameName: gameName
                    })
                    .then(res => {
                        console.log("joined game:", gameName);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log('maxPlayers:', maxPlayers);
    }, [maxPlayers]);

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Skapa nytt spel'>
                <FormTextInput defaultValue={genitiveCurrentUserUsername + ' spel'} handleInputFunction={handleGameNameInput} type='text' label='Spelnamn' id='typeNameX' />
                <FormRangeInput label='Max antal spelare' handleInputFunction={handleMaxPlayersInput} min={4} max={12} step={1} id='rangeMaxPlayersX' />
                <FormSubmitButton onClick={createGame} text='Skapa' />
            </Form>
        </div>


    );
}

export default CreateGame;