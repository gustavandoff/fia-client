import '../App.css';

const Header = ({title}) => {
    return(
        <header className="container-sm text-center bg-col-primary text-col-primary rounded-bottom" style={{
            height: '5rem',
        }}>
            <h1 className='text-wrap'> {title} </h1>
        </header>
    );
}

export default Header;