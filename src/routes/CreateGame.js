import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import Navbar from "../components/Header/Navbar";
import Form from "../components/Form/Form";
import FormSelectInput from "../components/Form/FormSelectInput";
import FormTextInput from "../components/Form/FormTextInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";

const CreateGame = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [gameName, setGameName] = useState('Nytt spel');
    const maxPlayerValueArray = [4, 5, 6, 7, 8, 9, 10, 11, 12]; // de värden man kan välja mellan på maxPlayers

    const handleMaxPlayersInput = value => {
        setMaxPlayers(maxPlayers === value ? null : value);
    }

    const handleGameNameInput = e => {
        setGameName(e.target.value);
    }

    const createGame = () => {
        if (!maxPlayers || !gameName){
            return;
        }

        axios
            .post(`http://localhost:4000/games`, {
                gameName: gameName,
                maxPlayers: maxPlayers
            })
            .then(res => {
                console.log('created game', gameName);
            })
            .catch(error => {
                console.log(error);
            });

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
    }

    useEffect(() => {
        console.log('maxPlayers:', maxPlayers);
    }, [maxPlayers]);

    let genitiveCurrentUserUsername = 'gästs';
    if (currentUser){
        if (currentUser.username.slice(-1) === 's' || currentUser.username.slice(-1) === 'x' || currentUser.username.slice(-1) === 'z'){
            genitiveCurrentUserUsername = currentUser.username;
        } else {
            genitiveCurrentUserUsername = currentUser.username + 's';
        }
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form>
                <FormTextInput defaultValue={genitiveCurrentUserUsername + ' spel'} handleInputFunction={handleGameNameInput} type='text' label='Spelnamn' id='typeNameX' />
                <FormSelectInput label='Max antal spelare' handleInputFunction={handleMaxPlayersInput} activeValue={maxPlayers} values={maxPlayerValueArray} />
                <FormSubmitButton onClick={createGame} text='Starta spel' />
            </Form>
        </div>


    );
}

export default CreateGame;