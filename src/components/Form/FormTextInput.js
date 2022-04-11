import '../../App.css';

const FormTextInput = ({ handleInputFunction, type, label, id, autocomplete, defaultValue, errorMessage }) => {
    return (
        <div className="form-outline form-white mb-2">
            <span className='text-warning float-start'>{errorMessage ? errorMessage : ''}</span>
            <input autoComplete={autocomplete ? autocomplete : ''} defaultValue={defaultValue ? defaultValue : ''} onChange={handleInputFunction} type={type} id={id} className="form-control form-control-lg" />
            <label className="form-label" htmlFor={id}>{label}</label>
        </div>
    );
}

export default FormTextInput;