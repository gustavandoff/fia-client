import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// det som visas i navbaren när man är inloggad
const NavProfile = ({ currentUser, setCurrentUser }) => {
    const [openDd, setOpenDd] = useState(false); // om navbaren ska var öppen
    const navigate = useNavigate();

    const logOut = () => {
        axios.post(`http://${window.location.hostname}:4000/logout`,
            { currentUser },
            {
                headers: { Authorization: 'Bearer ' + currentUser.jwt }
            })
        setCurrentUser(null);
        return navigate("/");
    }

    const DropDown = () => {
        const LogOutIn = () => { // visar antingen logga in eller logga ut beroende på man man kör som ett gästkonto eller inte
            const aClassName = "text-col-primary text-center text-decoration-none text-white-50 ms-1";
            if (currentUser.username.startsWith('gäst')) { // om man kör som ett gästkonto
                return (
                    <Link to="/login" className={aClassName}>
                        Logga in
                    </Link>
                );
            } else {
                return (
                    <a onClick={logOut} className={aClassName}>
                        Logga ut
                    </a>
                );
            }
        }

        // openDd är true ska dropdown visas
        return (openDd ?
            <DropdownMenu>
                <DropdownItem>
                    <LogOutIn />
                </DropdownItem>
            </DropdownMenu>
            : ''
        );
    }

    return (
        <div className="btn text-col-primary p-0 fia-dropdown-head">
            <div className="col">
                <div onClick={() => {
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
        </div>
    );
}
export default NavProfile;