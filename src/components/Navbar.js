import '../App.css';

const Navbar = ({ title }) => {
    return (
        <header role="banner" className="navbar navbar-expand-md navbar-dark bd-navbar container-sm bg-col-primary rounded-bottom">
            <nav className="container-xxl flex-wrap flex-md-nowrap">
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-toggle="#bdNavbar"></button>
                <div className="row">

                    <div className="col">
                        <a className="nav-link text-col-primary">Hej</a>
                    </div>
                    <div className="col">
                        <a className='h1 nav-link text-col-primary'> {title} </a>
                    </div>
                    <div className="col text-end">
                        <a className="nav-link text-col-primary">Hej</a>
                    </div>
                </div>


            </nav>
        </header>

    );
}

export default Navbar;