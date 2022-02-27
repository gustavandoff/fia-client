import { Link } from "react-router-dom";
import '../App.css';

const Signup = () => {
    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-col-primary text-col-primary" style={{ borderRadius: '2rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-2">

                                        <h2 className="fw-bold mb-2 text-uppercase">Skapa konto</h2>
                                        <p className="text-white-50 mb-5">Vänligen skriv in användarnamn och lösenord</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typeUsernameX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeUsernameX">Användarnamn</label>
                                        </div>

                                        <div className="form-outline form-white mb-1">
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typePasswordX">Lösenord</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password" id="typeConfirmPasswordX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeConfirmPasswordX">Bekräfta lösenord</label>
                                        </div>

                                        <Link to="/" className="btn btn-outline-light btn-lg bg-col-secondary text-col-secondary px-5" type="submit">Logga in</Link>

                                    </div>

                                    <div>
                                        <Link to="/login" className="text-decoration-none text-white-50 mb-4 fw-bold">Har du redan ett konto?</Link>
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

export default Signup;
