import '../../App.css';

const FormSelectInputOption = ({ value, onClick, activeValue }) => {

    let active = '';
    if (activeValue === value) {
        active = 'bg-secondary';
    }

    return (
        <li onClick={() => onClick(value)} className={`btn btn-secondary ${active} rounded-circle list-group-item m-1`} style={{
            cursor: 'pointer',
            border: active,
        }}>
            {value}
        </li>
    );
}

export default FormSelectInputOption;