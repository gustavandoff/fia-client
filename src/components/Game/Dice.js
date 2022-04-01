import { useState, useEffect } from "react";
import axios from 'axios';

const Dice = ({ currentDiceRoll, setCurrentDiceRoll }) => {
    const [roll, setRoll] = useState();
    const [showedRoll, setShowedRoll] = useState(1);

    const Side = ({ number }) => {

        const canRollDice = () => {
            return !number || number === 6;
        }

        const boxShadow = canRollDice() ? `0 0 1rem 1rem white` : '';
        const cursor = canRollDice() ? 'pointer' : 'default';

        const src = require(`../../assets/images/dice/${number ? number : 1}.jpg`);

        return (
            <img className='cursor-pointer' onClick={canRollDice() ? rollDice : () => { }} src={src} style={{
                width: '7rem',
                height: '7rem',
                boxShadow: boxShadow,
                cursor: cursor,
            }} />
        )
    }

    //useEffect(() => {
    //    if (!roll) return;
    //
    //    const rollLength = Math.floor(Math.random() * 5) + 7;
    //
    //    for (let i = 0; i < rollLength; i++) {
    //        setTimeout(() => {
    //            const randRoll = Math.floor(Math.random() * 6) + 1;
    //            setShowedRoll(randRoll);
    //        }, 50);
    //    }
    //
    //    setCurrentDiceRoll(roll);
    //    setShowedRoll(roll);
    //}, [roll])

    const rollDice = () => {
        axios.get(`http://localhost:4000/dice`)
            .then(res => {
                //setRoll(res.data);
                setCurrentDiceRoll(res.data);
                //setShowedRoll(res.data);
            });
    }

    return (
        <div >
            <Side number={currentDiceRoll} />
        </div>
    )
}

export default Dice;