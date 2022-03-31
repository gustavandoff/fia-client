import '../../App.css';
import { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";


const FormListInput = ({ handleInputFunction, values, valuesInfoRight, valuesInfoBottom, label, id, activeValue, nothingFoundMessage, refreshFunction }) => {
    const [currentValues, setCurrentValues] = useState(values);
    const [currentValuesInfoRight, setCurrentValuesInfoRight] = useState(valuesInfoRight);
    const [currentValuesInfoBottom, setCurrentValuesInfoBottom] = useState(valuesInfoBottom);
    const [searchedValue, setSearchedValue] = useState();

    const ListOption = ({ value, infoRight, infoBottom }) => {
        let active = '';
        if (activeValue === value) {
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
        values.forEach((e, i) => {
            if (e.includes(searchedValue)) {
                tempCurrentValues.push(e);
                tempCurrentValuesInfoRight.push(valuesInfoRight[i]);
                tempCurrentValuesInfoBottom.push(valuesInfoBottom[i])
            }
        });
        console.log(tempCurrentValues, tempCurrentValuesInfoRight, tempCurrentValuesInfoBottom);
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

    if (!currentValues || currentValues.length === 0) {
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
                <ul className='game-list px-1 list-group align-items-center mx-auto'>
                    {listItems}
                </ul>
            </div>
        </div>

    );
}

export default FormListInput;