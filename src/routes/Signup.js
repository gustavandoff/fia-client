import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../App.css';

import Form from "../components/Form/Form";
import FormTextInput from "../components/Form/FormTextInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import Navbar from "../components/Header/Navbar";

const Signup = ({ currentUser, setCurrentUser }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confPassword, setConfPassword] = useState();

    const handleUsernameInput = event => {
        setUsername(event.target.value);
    };

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    };

    const handleConfPasswordInput = event => {
        setConfPassword(event.target.value);
    };

    const signUp = () => {
        axios
            .post(`http://${window.location.hostname}:4000/signup`, {
                username: username,
                password: password,
                confPassword: confPassword
            })
            .then(res => {
                setCurrentUser(res.data.currentUser);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (currentUser && !currentUser.username.startsWith('gäst')) {
            console.log("login currentUser:", currentUser);
            return navigate("/");
        }
    }, [currentUser]);

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Form title='Skapa konto' linkPath='/login' linkText='Har du redan ett konto?'>
                <FormTextInput handleInputFunction={handleUsernameInput} autocomplete='username' type='text' label='Användarnamn' id='typeUsernameX' />
                <FormTextInput handleInputFunction={handlePasswordInput} autocomplete='new-password' type='password' label='Lösenord' id='typePasswordX' />
                <FormTextInput handleInputFunction={handleConfPasswordInput} autocomplete='new-password' type='password' label='Bekräfta lösenord' id='typeConfirmPasswordX' />
                <FormSubmitButton onClick={signUp} text='Skapa konto' />
            </Form>
        </div>

    );
}

export default Signup;
