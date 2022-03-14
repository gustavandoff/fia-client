import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import Login from '../routes/Login';
import Signup from '../routes/Signup';


const Root = () => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path="/signup" element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
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