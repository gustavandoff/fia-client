import NavLogIn from "./NavLogIn";
import NavProfile from "./NavProfile";


const NavRight = ({ currentUser, setCurrentUser }) => {

    const RenderHTML = () => {
        if (currentUser)
            return <NavProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        else
            return <NavLogIn  />
    }

    return (
        <RenderHTML />
    );
}

export default NavRight;