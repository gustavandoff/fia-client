import { Link } from "react-router-dom";
import axios from 'axios';

import '../App.css';

const Login = () => {

    const logIn = () => {
        //setLoggedIn(true);
        // anropa servern med inloggnings-inputsen. om de stämmer ska man skickas till startsidan annars "kastas" fel
        axios.post(`http://localhost:4000/login`)
            .then(res => {
                console.log("login logged in:", res.data);
            });
    }


    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-col-primary text-col-primary" style={{ borderRadius: '2rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-2">

                                        <h2 className="fw-bold mb-2 text-uppercase">Logga in</h2>
                                        <p className="text-white-50 mb-5">Vänligen skriv in användarnamn och lösenord</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typeUsernameX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeUsernameX">Användarnamn</label>
                                            <div className="form-notch">
                                                <div className="form-notch-leading" style={{ width: '9px' }}></div>
                                                <div className="form-notch-middle" style={{ width: '40px' }}></div>
                                                <div className="form-notch-trailing"></div>
                                            </div>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typePasswordX">Lösenord</label>
                                        </div>

                                        <Link to="/" onClick={logIn} className="btn btn-outline-light btn-lg bg-col-secondary text-col-secondary px-5" type="submit">Logga in</Link>

                                    </div>

                                    <div>
                                        <Link to="/signup" className="text-decoration-none text-white-50  mb-4 fw-bold">Skapa ett konto</Link>
                                        <p className="small mb-3 pb-lg-2"><Link to="/recovery" className="text-decoration-none text-white-50">Lyckas du inte logga in?</Link></p>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
