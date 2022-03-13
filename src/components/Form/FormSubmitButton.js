const FormSubmitButton = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="btn btn-outline-light btn-lg bg-col-secondary text-col-secondary px-5 mt-4" type="submit">{text}</button>
    );
}

export default FormSubmitButton;