import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import Login from '../routes/Login';
import Signup from '../routes/Signup';
import Play from '../routes/Play';
import CreateGame from '../routes/CreateGame';
import JoinGame from '../routes/JoinGame';
import GameRoute from '../routes/GameRoute';


const Root = () => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
                    <Route path=':gameName' element={<GameRoute currentUser={currentUser} setCurrentUser={setCurrentUser} />}/>
                </Route>
                <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/signup" element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/play" element={<Play currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/creategame" element={<CreateGame currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/joingame" element={<JoinGame currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;