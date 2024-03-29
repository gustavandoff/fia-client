import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

import Form from "../components/Form/Form";
import FormTextInput from "../components/Form/FormTextInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import Navbar from "../components/Header/Navbar";

// Sidan där man loggar in
const Login = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const handleUsernameInput = event => {
        setUsername(event.target.value);
    };

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    };

    const logIn = () => {
        axios
            .post(`http://${window.location.hostname}:4000/login`, {
                username: username,
                password: password
            })
            .then(res => {
                setCurrentUser(res.data.currentUser);
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            });
    }

    useEffect(() => {
        if (currentUser && !currentUser.username.startsWith('gäst')) { // om man redan är inloggad som en användare
            return navigate("/");
        }
    }, [currentUser]);


    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Logga in' linkPath='/signup' linkText='Skapa konto'>
                <FormTextInput handleInputFunction={handleUsernameInput} autocomplete='username' type='text' label='Användarnamn' id='typeUsernameX' errorMessage={errorMessage} />
                <FormTextInput handleInputFunction={handlePasswordInput} autocomplete='current-password' type='password' label='Lösenord' id='typePasswordX' />
                <FormSubmitButton onClick={logIn} text='Logga in' />
            </Form>
        </div>

    );
}

export default Login;