const DropdownMenu = ({ children }) => {

    return (
        <ul className="fia-dropdown-menu m-0 p-0 bg-col-primary text-col-primary position-absolute rounded-bottom">
            {children}
        </ul>
    );
}

export default DropdownMenu;