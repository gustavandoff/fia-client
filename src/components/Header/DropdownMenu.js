const DropdownMenu = ({ children }) => {

    return (
        <ul className="fia-dropdown-menu p-0 bg-col-primary text-col-primary position-absolute">
            {children}
        </ul>
    );
}

export default DropdownMenu;