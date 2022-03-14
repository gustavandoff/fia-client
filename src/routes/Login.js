import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

import Form from "../components/Form/Form";
import FormInput from "../components/Form/FormInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";

const Login = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleUsernameInput = event => {
        setUsername(event.target.value);
    };

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    };

    const logIn = () => {
        axios
            .post(`http://localhost:4000/login`, {
                username: username,
                password: password
            })
            .then(res => {
                setCurrentUser(res.data.currentUser);
                console.log("login currentUser:", res);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log("login logged in:", currentUser);
        if (currentUser) {
            return navigate("/");
        }
    }, [currentUser]);


    return (
        <Form title='Logga in' linkPath='/signup' linkText='Skapa konto'>
            <FormInput handleInputFunction={handleUsernameInput} type='text' label='Användarnamn' id='typeUsernameX' />
            <FormInput handleInputFunction={handlePasswordInput} type='password' label='Lösenord' id='typePasswordX' />
            <FormSubmitButton onClick={logIn} text='Logga in' />
        </Form>
    );
}

export default Login;
