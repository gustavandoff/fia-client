import '../../App.css';
import { useState } from 'react';

// en slider där man kan dra från ett min-värde till ett max-värde
const FormRangeInput = ({ handleInputFunction, label, id, min, max, step, defaultValue }) => {
    const [currentValue, setCurrentValue] = useState(defaultValue ? defaultValue : min); // det valda värdet
    
    const handleInput = e => {
        handleInputFunction(e);
        setCurrentValue(e.target.value);
    }

    return (
        <div className="form-outline form-white mb-2 align-items-center">
            <input min={min} max={max} defaultValue={defaultValue ? defaultValue : min} step={step} onChange={handleInput} type='range' id={id} className="form-range" />
            <label className="form-label" htmlFor={id}>{label}: <span className='form-range-value' >{currentValue}</span></label>
        </div>
    );
}

export default FormRangeInput;