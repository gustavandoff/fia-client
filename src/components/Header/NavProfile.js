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
        {},
        {
            headers: { Authorization: 'Bearer ' + currentUser.jwt }
        })
        .then(res => {
            setCurrentUser(null);
            return navigate("/");
        })
        .catch(e => {
            console.error(e);
        });
    }
    
    let dropDown;
    const { username } = currentUser;

    if (open) {
        dropDown = (
            <DropdownMenu>
                <DropdownItem>
                    <div>
                        {username}
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <div>
                        {username}
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <div>
                        {username}
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <div>
                        {username}
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <div>
                        {username}
                    </div>
                </DropdownItem>

                <DropdownItem>
                    <a onClick={logOut} className="text-col-primary">
                        Logga ut
                    </a>
                </DropdownItem>
            </DropdownMenu>
        );
    }

    return (
        <div onClick={() => setOpen(!open)} className="btn text-col-primary p-0 fia-dropdown-head">
            {username}
            <MdKeyboardArrowDown style={{
                transform: `rotate(${open ? 180 : 0}deg)`,
                transition: 'transform 300ms'
            }} />
            {dropDown}

        </div>
    );
}
export default NavProfile;