import '../../App.css';
import FormSelectInputOption from './FormSelectInputOption';

const FormSelectInput = ({ handleInputFunction, values, label, id, activeValue }) => {

    let listItems = [];

    values?.forEach((e,i) => {
        listItems.push(
            <FormSelectInputOption value={e} onClick={handleInputFunction} activeValue={activeValue} key={i}/>
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