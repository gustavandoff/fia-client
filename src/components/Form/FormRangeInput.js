import '../../App.css';
import { useState } from 'react';

const FormRangeInput = ({ handleInputFunction, label, id, min, max, step }) => {
    const [currentValue, setCurrentValue] = useState(min);
    
    const handleInput = e => {
        handleInputFunction(e);
        setCurrentValue(e.target.value);
    }

    return (
        <div className="form-outline form-white mb-2 align-items-center">
            <input min={min} max={max} defaultValue={min} step={step} onChange={handleInput} type='range' id={id} className="form-range" />
            <label className="form-label" htmlFor={id}>{label}: <span className='form-range-value' >{currentValue}</span></label>
        </div>
    );
}

export default FormRangeInput;