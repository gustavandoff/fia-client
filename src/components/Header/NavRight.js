import NavLogIn from "./NavLogIn";
import NavProfile from "./NavProfile";

// den delen av navbaren som är till höger
const NavRight = ({ currentUser, setCurrentUser }) => {

    if (currentUser) // om man är inloggad ska NavProfile visas
        return <NavProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />
    else // annats ska NavLogIn visas
        return <NavLogIn />
}

export default NavRight;