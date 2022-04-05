const DropdownMenu = ({ children }) => {

    return (
        <ul className="fia-dropdown-menu p-0 bg-col-primary text-col-primary position-absolute rounded-bottom">
            {children}
        </ul>
    );
}

export default DropdownMenu;