import NavLogIn from "./NavLogIn";
import NavProfile from "./NavProfile";


const NavRight = ({ currentUser, setCurrentUser }) => {

    const renderHTML = () => {
        if (currentUser) {
            return (
                <NavProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            );
        } else {
            return (
                <NavLogIn  />
            );
        }
    }

    return (
        renderHTML()
    );
}

export default NavRight;