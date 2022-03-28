import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Modal } from 'bootstrap'
import Navbar from "../components/Header/Navbar";

const Play = ({ currentUser, setCurrentUser }) => {
    const [modal, setModal] = useState(null);
    const exampleModal = useRef();
    const navigate = useNavigate();
    let linkPath;

    useEffect(() => {
        if (!currentUser) {
            setModal(
                new Modal(exampleModal.current)
            );
        }

    }, []);

    const linkClicked = (path) => {
        if (currentUser) return navigate(path);
        linkPath = path;
        modal.show();
    }

    const closeModal = () => {
        modal.hide();
        return navigate(linkPath);
    }

    const linkLogin = () => {
        modal.hide();
        return navigate('/login');
    }

    let guestMessage = '';
    if (!currentUser) {
        guestMessage = (
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
                            <button type="button" className="btn btn-primary" onClick={closeModal}>Fortsätt ändå</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <div className="container position-relative h-100" style={{top: '25vh'}}>
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