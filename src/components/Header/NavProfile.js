import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const NavProfile = ({ currentUser, setCurrentUser }) => {
    const [open, setOpen] = useState(false);
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

    const DropDown = () => {
        let dropDown = '';

        const LogOutIn = () => {
            if (currentUser.username.startsWith('gäst')) {
                return (
                    <a onClick={logIn} className="text-col-primary">
                        Logga in
                    </a>
                );
            } else {
                return (
                    <a onClick={logOut} className="text-col-primary">
                        Logga ut
                    </a>
                );
            }
        }

        if (open) {
            dropDown = (
                <DropdownMenu>
                    <DropdownItem>
                        <div>
                            Lista mina spel (Fungerar inte)
                        </div>
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
        <div onClick={() => setOpen(!open)} className="btn text-col-primary p-0 fia-dropdown-head">
            <span className="text-col-secondary font-size-1-5 fw-bold">{currentUser.username}</span>
            <MdKeyboardArrowDown className="text-col-secondary font-size-1-5" style={{
                transform: `rotate(${open ? 180 : 0}deg)`,
                transition: 'transform 300ms'
            }} />
            <DropDown />

        </div>
    );
}
export default NavProfile;