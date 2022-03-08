import NavLogIn from "./NavLogIn";
import NavProfile from "./NavProfile";


const NavRight = ({ loggedIn, setLoggedIn }) => {

    let username = "gustav";

    const renderHTML = () => {
        if (loggedIn) {
            return (
                <NavProfile setLoggedIn={setLoggedIn} username={username} />
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