import { Link } from "react-router-dom";

const NavLogIn = ({ setLoggedIn }) => {

    const logIn = () => {
        setLoggedIn(true);
    }

    return (
        //<a onClick={logIn} className="btn btn-secondary stretched rounded-pill text-nowrap">
        <Link to="/login" onClick={logIn} className="btn btn-secondary stretched rounded-pill text-nowrap">Logga in</Link>
        //</a>
    );
}
export default NavLogIn;