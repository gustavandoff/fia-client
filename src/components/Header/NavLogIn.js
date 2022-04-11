import { Link } from "react-router-dom";

// login knappen i navbaren
const NavLogIn = () => {
    return (
        <Link to="/login" className="btn btn-primary stretched rounded text-nowrap">Logga in</Link>
    );
}
export default NavLogIn;