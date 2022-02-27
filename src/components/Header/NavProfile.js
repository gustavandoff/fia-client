import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import { useState } from 'react';

const NavProfile = ({ username, setLoggedIn }) => {
    const [open, setOpen] = useState(false);

    const logOut = () => {
        setLoggedIn(false);
    }

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