const DropdownItem = ({ loggedIn, setLoggedIn, children }) => {


    return (
        <li className="fia-dropdown-item">
            {children}
        </li>
    );
}

export default DropdownItem;