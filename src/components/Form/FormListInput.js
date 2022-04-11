import '../../App.css';
import { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

// listar en rad olika saker man kan välja mellan samt söka bland dem
const FormListInput = ({ handleInputFunction, values, valuesInfoRight, valuesInfoBottom, label, id, activeValue, nothingFoundMessage, refreshFunction, errorMessage }) => {
    const [currentValues, setCurrentValues] = useState(values); // de värdena som visas i listan
    const [currentValuesInfoRight, setCurrentValuesInfoRight] = useState(valuesInfoRight); // information som visas längst till höger om värdet
    const [currentValuesInfoBottom, setCurrentValuesInfoBottom] = useState(valuesInfoBottom); // information som visas under värdet
    const [searchedValue, setSearchedValue] = useState(); // det värde man sökt efter

    const ListOption = ({ value, infoRight, infoBottom }) => { // varje värde
        let active = '';
        if (activeValue === value) { // om detta värde är aktivt ska det byta färg 
            active = 'bg-secondary';
        }

        return (
            <li onClick={() => handleInputFunction(value)} className={`btn btn-secondary ${active} list-group-item m-1 w-100`}>
                <span className='float-start'>{value}</span>
                <span className='float-end'> {infoRight} <FaUsers /></span>
                <br />
                <span className='float-start text-info fw-bold'> {infoBottom} </span>
            </li>
        )
    }

    useEffect(() => {
        setCurrentValues(values);
    }, [values]);

    useEffect(() => {
        setCurrentValuesInfoRight(valuesInfoRight);
    }, [valuesInfoRight]);

    useEffect(() => {
        setCurrentValuesInfoBottom(valuesInfoBottom);
    }, [valuesInfoBottom]);

    useEffect(() => {
        if (!searchedValue) {
            setCurrentValues(values);
            setCurrentValuesInfoRight(valuesInfoRight);
            setCurrentValuesInfoBottom(valuesInfoBottom);
            return;
        }
        let tempCurrentValues = [];
        let tempCurrentValuesInfoRight = [];
        let tempCurrentValuesInfoBottom = [];
        values.forEach((e, i) => { // values, valuesInfoRight och valuesInfoBottom är arrays där indexet i varje lista hör ihop
            if (e.includes(searchedValue)) { // endast om elementet innehåller det man sökt efter ska det visas
                tempCurrentValues.push(e);
                tempCurrentValuesInfoRight.push(valuesInfoRight[i]);
                tempCurrentValuesInfoBottom.push(valuesInfoBottom[i])
            }
        });
        setCurrentValues(tempCurrentValues);
        setCurrentValuesInfoRight(tempCurrentValuesInfoRight);
        setCurrentValuesInfoBottom(tempCurrentValuesInfoBottom);
    }, [searchedValue]);

    const searchValues = v => {
        setSearchedValue(v.target.value);
    }

    const refresh = () => {
        setCurrentValues([]);
        setCurrentValuesInfoRight([]);
        setCurrentValuesInfoBottom([]);
        refreshFunction();
    }

    let listItems = [];
    currentValues?.forEach((e, i) => {
        listItems.push(
            <ListOption key={i} value={e} infoRight={currentValuesInfoRight[i]} infoBottom={currentValuesInfoBottom[i]} />
        );
    });

    if (!currentValues || currentValues.length === 0) { // Om det inte finns några värden att visa
        listItems.push(
            <li key={1} className={`list-group-item m-1 w-100`}>
                <span className='float-start'>{nothingFoundMessage}</span>
            </li>
        );
    }

    return (
        <div className="form-outline form-white mb-2 align-items-center">
            <label className="form-label" htmlFor={id}>{label}</label>
            <a onClick={refresh} className='cursor-pointer text-col-primary position-absolute m-3 top-0 end-0'>
                <MdRefresh size='5rem' />
            </a>

            <div className='align-items-center'>
                <input onChange={searchValues} type='text' placeholder='Sök...' className="form-control w-75 form-control-lg mx-auto mb-2"></input>
                <span className='text-warning'>{errorMessage ? errorMessage : ''}</span>
                <ul className='game-list px-1 list-group align-items-center mx-auto'>
                    {listItems}
                </ul>
            </div>
        </div>

    );
}

export default FormListInput;