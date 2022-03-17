import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

import Navbar from "../components/Header/Navbar";

const NewGame = ({ currentUser, setCurrentUser }) => {

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <Link to='/creategame' className='btn btn-primary stretched rounded font-size-2 px-5 text-nowrap m-2'>Skapa nytt spel</Link>
            <Link to='/joingame' className='btn btn-primary stretched rounded font-size-2 px-5 text-nowrap m-2'>Gå med i spel</Link>
        </div>


    );
}

export default NewGame;