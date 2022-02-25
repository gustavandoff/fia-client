import '../../App.css';
import RightNav from './RightNav';
import { useState } from 'react';

const Navbar = () => {

    const [loggedIN, setLoggedIn] = useState(true);

    return (
        <header role="banner" className="container-sm bg-col-primary rounded-pill">
            <nav className="container-xxl flex-wrap flex-md-nowrap">
                {//<button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-toggle="#bdNavbar"></button>
                }<div className="row">

                    <div className="col-3">
                        <a className="text-col-primary">Hej</a>
                    </div>
                    <div className="col-6 text-center">
                        <a className='btn btn-primary stretched font-size-2 text-nowrap'>Nytt spel</a>
                    </div>
                    <div className="col-3 text-end d-flex align-items-center justify-content-end pe-3">
                        <RightNav loggedIn={loggedIN} />
                    </div>
                </div>


            </nav>
        </header>

    );
}

export default Navbar;