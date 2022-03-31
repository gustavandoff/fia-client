import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import Login from '../routes/Login';
import Signup from '../routes/Signup';
import Play from '../routes/Play';
import CreateGame from '../routes/CreateGame';
import JoinGame from '../routes/JoinGame';
import GameRoute from '../routes/GameRoute';
import Error404 from '../routes/Error404';


const Root = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const localStorageCurrentUser = window.localStorage.getItem('currentUser');
        setCurrentUser(JSON.parse(localStorageCurrentUser));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Play currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/games" element={<App currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
                    <Route path=':gameName' element={<GameRoute currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                </Route>
                <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/signup" element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/creategame" element={<CreateGame currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/joingame" element={<JoinGame currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="*" element={<Error404 currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;