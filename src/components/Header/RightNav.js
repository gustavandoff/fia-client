import { CgProfile } from "react-icons/cg";


const RightNav = ({ loggedIn }) => {

    let renderHTML;

    if (loggedIn) {
        renderHTML = () => {
            return (
                <a className="d-flex align-items-center text-col-primary font-size-3">
                    <CgProfile />
                </a>
            );
        };
    } else {
        renderHTML = () => {
            return (
                <a className="btn btn-secondary stretched rounded-pill text-nowrap">
                    Logga in
                </a>
            );
        };
    }

    return (
        renderHTML()
    )
}

export default RightNav;