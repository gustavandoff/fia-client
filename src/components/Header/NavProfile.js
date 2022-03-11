import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import { useState } from 'react';
import axios from 'axios';

const NavProfile = ({ setLoggedIn }) => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState();

    const logOut = () => {
        setLoggedIn(false);
        axios.post(`http://localhost:4000/logout`);
    }

    axios.get(`http://localhost:4000/user`)
        .then(res => {
            setUsername(res.data.username);
        });

    let dropDown;

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