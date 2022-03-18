import '../../App.css';

const FormTextInput = ({ handleInputFunction, type, label, id, defaultValue }) => {
    return (
        <div className="form-outline form-white mb-2">
            <input defaultValue={defaultValue ? defaultValue : ''} onChange={handleInputFunction} type={type} id={id} className="form-control form-control-lg" />
            <label className="form-label" htmlFor={id}>{label}</label>
        </div>
    );
}

export default FormTextInput;