import { Link } from "react-router-dom";

const Form = ({ children, title, linkPath, linkText }) => {
    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-col-primary text-col-primary" style={{ borderRadius: '2rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-2">

                                        <h2 className="fw-bold mb-2 text-uppercase">{title}</h2>
                                        <p className="text-white-50 mb-5">Vänligen fyll i nedanstående fält</p>

                                        {children}

                                    </div>

                                    <div>
                                        <Link to={linkPath} className="text-decoration-none text-white-50 mb-4 fw-bold">{linkText}</Link>
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

export default Form;