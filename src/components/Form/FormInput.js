import '../../App.css';

const FormInput = ({ handleInputFunction, type, label, id }) => {
    return (
        <div className="form-outline form-white mb-2">
            <input onChange={handleInputFunction} type={type} id={id} className="form-control form-control-lg" />
            <label className="form-label" htmlFor={id}>{label}</label>
        </div>
    );
}

export default FormInput;