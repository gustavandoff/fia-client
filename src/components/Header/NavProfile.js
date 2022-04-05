import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const NavProfile = ({ currentUser, setCurrentUser }) => {
    const [openDd, setOpenDd] = useState(false);
    const [openMyGames, setOpenMyGames] = useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        axios.post(`http://localhost:4000/logout`,
            { currentUser },
            {
                headers: { Authorization: 'Bearer ' + currentUser.jwt }
            })
        setCurrentUser(null);
        return navigate("/");
    }

    const logIn = () => {
        return navigate('/login');
    }

    const GameList = () => {
        let result = [];
        let gameList;

        axios.get(`http://localhost:4000/gamesUser/${currentUser.username}/`)
            .then(res => {
                gameList = res.data;
            })
            .catch(error => {
                console.error(error);
            });

        if (openMyGames) {
            result.push(
                <div key={0} onClick={() => setOpenMyGames(false)}>
                    Mina spel:
                </div>
            );
        } else {
            result.push(
                <div key={2} onClick={() => setOpenMyGames(true)}>
                    Lista mina spel
                </div>
            );
        }



        return result;
    }

    const DropDown = () => {
        let dropDown = '';

        const LogOutIn = () => {
            const aClassName = "text-col-primary text-center text-decoration-none text-white-50 ms-1";
            if (currentUser.username.startsWith('gäst')) {
                return (
                    <a onClick={logIn} className={aClassName}>
                        Logga in
                    </a>
                );
            } else {
                return (
                    <a onClick={logOut} className={aClassName}>
                        Logga ut
                    </a>
                );
            }
        }

        if (openDd) {
            dropDown = (
                <DropdownMenu>
                    <DropdownItem>
                        <GameList />
                    </DropdownItem>

                    <DropdownItem>
                        <LogOutIn />
                    </DropdownItem>
                </DropdownMenu>
            );
        }

        return dropDown;
    }

    return (
        <div className="btn text-col-primary p-0 fia-dropdown-head">
            <div onClick={() => {
                setOpenMyGames(false);
                setOpenDd(!openDd);
            }}>
                <span className="text-col-secondary font-size-1-5 fw-bold">{currentUser.username}</span>
                <MdKeyboardArrowDown className="text-col-secondary font-size-1-5" style={{
                    transform: `rotate(${openDd ? 180 : 0}deg)`,
                    transition: 'transform 150ms'
                }} />
            </div>

            <DropDown />

        </div>
    );
}
export default NavProfile;