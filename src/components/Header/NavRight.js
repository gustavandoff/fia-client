import NavLogIn from "./NavLogIn";
import NavProfile from "./NavProfile";


const NavRight = ({ loggedIn, setLoggedIn }) => {

    const renderHTML = () => {
        if (loggedIn) {
            return (
                <NavProfile setLoggedIn={setLoggedIn}/>
            );
        } else {
            return (
                <NavLogIn />
            );
        }
    }

    return (
        renderHTML()
    );
}

export default NavRight;