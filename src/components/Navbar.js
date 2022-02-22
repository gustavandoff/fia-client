import '../App.css';

const Navbar = ({ title }) => {
    return (
        <nav className="container-sm text-center bg-col-primary text-col-primary rounded-bottom" style={{
            height: '5rem',
        }}>
            <h1 className='text-wrap'> {title} </h1>
            
        </nav>
    );
}

export default Navbar;