// innehållet av en dropdown
const DropdownItem = ({ loggedIn, setLoggedIn, children }) => {
    return (
        <li className="fia-dropdown-item p-1">
            {children}
        </li>
    );
}

export default DropdownItem;