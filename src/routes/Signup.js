import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

import Form from "../components/Form/Form";
import FormInput from "../components/Form/FormInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";

const Signup = () => {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState();
    const [displayname, setDisplayname] = useState();
    const [password, setPassword] = useState();
    const [confPassword, setConfPassword] = useState(); 

    const handleUsernameInput = event => {
        setUsername(event.target.value);
    };

    const handleDisplaynameInput = event => {
        setDisplayname(event.target.value);
    };

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    };

    const handleConfPasswordInput = event => {
        setConfPassword(event.target.value);
    };

    const signUp = () => {
        //setLoggedIn(true);
        // anropa servern med inloggnings-inputsen. om de stämmer ska man skickas till startsidan annars "kastas" fel
        axios
            .post(`http://localhost:4000/signup`, {
                username: username,
                displayname: displayname,
                password: password,
                confPassword: confPassword
            })
            .then(res => {
                setLoggedIn(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (loggedIn) {
            console.log("login logged in:", loggedIn);
            return navigate("/");
        }
    }, [loggedIn]);

    return (
        <Form title='Skapa konto' linkPath='/login' linkText='Har du redan ett konto?'>
            <FormInput handleInputFunction={handleUsernameInput} type='text' label='Användarnamn' id='typeUsernameX' />
            <FormInput handleInputFunction={handleDisplaynameInput} type='text' label='Visningsnamn' id='typeDisplaynameX' />
            <FormInput handleInputFunction={handlePasswordInput} type='password' label='Lösenord' id='typePasswordX' />
            <FormInput handleInputFunction={handleConfPasswordInput} type='password' label='Bekräfta lösenord' id='typeConfirmPasswordX' />
            <FormSubmitButton onClick={signUp} text='Skapa konto' />
        </Form>
    );
}

export default Signup;
