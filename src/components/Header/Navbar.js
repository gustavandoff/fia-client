import '../../App.css';
import NavRight from './NavRight';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";

const Navbar = ({ currentUser, setCurrentUser }) => {
    return (
        <header className="container-sm w-100 start-0 end-0 top-0 position-fixed">
            <nav className="container-xxl">
                {//<button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-toggle="#bdNavbar"></button>
                }<div className="row">

                    <div className="col-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-4 text-center fia-border-bottom">
                        <div className="container-sm w-75 rounded-pill">
                            <Link to='/play' className='text-center position-relative btn btn-orange rounded stretched font-size-2 px-5 text-nowrap m-2'>Nytt spel</Link>
                        </div>

                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4 col-xl-4 text-end d-flex align-items-center justify-content-end pe-3">
                        <NavRight currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    </div>
                </div>


            </nav>
        </header>

    );
}

export default Navbar;