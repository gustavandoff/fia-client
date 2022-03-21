import '../../App.css';
import NavRight from './NavRight';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";

const Navbar = ({ currentUser, setCurrentUser }) => {
    return (
        <header style={{ zIndex: '300000' }} className="container-sm bg-col-primary rounded-pill">
            <nav className="container-xxl flex-wrap flex-md-nowrap">
                {//<button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-toggle="#bdNavbar"></button>
                }<div className="row">

                    <div className="col-3 text-start d-flex align-items-center justify-content-start ps-3">
                        <Link to='/' className='text-col-primary'>
                            <MdHome size='3.5rem' className='' />
                        </Link>

                    </div>
                    <div className="col-6 text-center">
                        <Link to='/play' className='btn btn-orange stretched rounded font-size-2 px-5 text-nowrap m-2'>Spela</Link>
                    </div>
                    <div className="col-3 text-end d-flex align-items-center justify-content-end pe-3">
                        <NavRight currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    </div>
                </div>


            </nav>
        </header>

    );
}

export default Navbar;