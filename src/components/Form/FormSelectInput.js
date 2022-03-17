import '../../App.css';
import FormSelectInputOption from './FormSelectInputOption';

const FormSelectInput = ({ handleInputFunction, values, label, id }) => {

    let listItems = [];

    values.forEach(e => {
        listItems.push(
            <FormSelectInputOption value={e} onClick={handleInputFunction} />
        );
    });

    return (
        <div className="form-outline form-white mb-2 align-items-center">
            <ul className='list-group list-group-horizontal align-items-center' id={id}>
                {listItems}
            </ul>
            <label className="form-label" htmlFor={id}>{label}</label>
        </div>
    );
}

export default FormSelectInput;