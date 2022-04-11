import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Modal } from 'bootstrap'
import Navbar from "../components/Header/Navbar";

// startsidan
const Play = ({ currentUser, setCurrentUser }) => {
    const [modal, setModal] = useState(null);
    const exampleModal = useRef();
    const navigate = useNavigate();
    let linkPath; // den sprar vilken knapp men tryckt på när modalen dyker upp

    useEffect(() => {
        if (!currentUser || currentUser.username.startsWith('gäst')) {
            setModal(
                new Modal(exampleModal.current)
            );
        }
    }, [currentUser]);

    const generateGuestUsername = () => { // om man ska köra som en gäst genereras en slumpad gästkod
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result = 'gäst_';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const linkClicked = (path) => {
        if (currentUser) return navigate(path);
        linkPath = path;
        modal.show();
    }

    const playAsGuest = () => {
        modal.hide();
        if (!currentUser) {
            setCurrentUser({ username: generateGuestUsername() });
        }
        return navigate(linkPath);
    }

    const linkLogin = () => {
        modal.hide();
        return navigate('/login');
    }

    let guestMessage = '';
    if (!currentUser || currentUser.username.startsWith('gäst')) {
        guestMessage = ( // modal
            <div className="modal" ref={exampleModal} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Observera!</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Du är inte inloggad och spelar därför som gäst. Dina spel kommer inte att sparas.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={linkLogin}>Logga in</button>
                            <button type="button" className="btn btn-primary" onClick={playAsGuest}>Fortsätt ändå</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <div className="container position-relative h-100" style={{ top: '25vh' }}>
                {guestMessage}
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <a onClick={() => linkClicked('/creategame')} className='card text-center btn btn-primary bg-col-primary stretched font-size-2 py-5 m-2' style={{ borderRadius: '2rem' }}>Skapa nytt spel</a>
                    </div>

                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <a onClick={() => linkClicked('/joingame')} className='card text-center btn btn-primary bg-col-primary stretched font-size-2 py-5 m-2' style={{ borderRadius: '2rem' }}>Gå med i spel</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Play;