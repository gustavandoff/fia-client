const FormSubmitButton = ({ onClick, text, disabled, title }) => {
    return (
        <button onClick={onClick} className={`btn btn-outline-light btn-lg bg-col-secondary text-col-secondary ${disabled ? 'disabled pe-auto cursor-default' : ''} px-5 mt-4`} title={title} type="submit">{text}</button>
    );
}

export default FormSubmitButton;