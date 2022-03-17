import '../../App.css';

const FormSelectInputOption = ({ value, onClick }) => {
    return (
        <li onClick={() => onClick(value)} className="btn btn-secondary rounded-circle list-group-item m-1" style={{
            cursor: 'pointer',
        }}>
            {value}
        </li>
    );
}

export default FormSelectInputOption;