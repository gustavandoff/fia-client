import Navbar from "../components/Header/Navbar";
import Form from "../components/Form/Form";
import { useEffect, useState } from "react";
import FormSelectInput from "../components/Form/FormSelectInput";

const NewGame = ({ currentUser, setCurrentUser }) => {
    const [maxPlayers, setMaxPlayers] = useState(4);
    const maxPlayerValueArray = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // de värden man kan välja mellan på maxPlayers

    const handleMaxPlayersInput = value => {
        setMaxPlayers(value);
    }

    useEffect(() => {
        console.log('maxPlayers:', maxPlayers);
    }, [maxPlayers]);

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Skapa spel'>
                <FormSelectInput handleInputFunction={handleMaxPlayersInput} values={maxPlayerValueArray} />
            </Form>
        </div>


    );
}

export default NewGame;