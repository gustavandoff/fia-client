import { useState, useEffect } from "react";
import axios from 'axios';

const Dice = ({ currentDiceRoll, setCurrentDiceRoll, socket, game }) => {
    const [showedRoll, setShowedRoll] = useState(1);

    useEffect(() => {
        let animationInterval;
        if (!currentDiceRoll && !animationInterval) {
            animationInterval = setInterval(() => {
                setShowedRoll((oldRoll) => oldRoll === 6 ? 1 : oldRoll + 1);
            }, 400);
        } else {
            clearInterval(animationInterval);
            setShowedRoll(currentDiceRoll);
        }

        return () => {
            clearInterval(animationInterval);
        }
    }, [currentDiceRoll]);

    const Side = ({ number }) => {



        const boxShadow = !currentDiceRoll ? `0 0 1rem 1rem white` : '';
        const cursor = !currentDiceRoll ? 'pointer' : 'default';

        const src = require(`../../assets/images/dice/${number ? number : showedRoll}.jpg`);

        return (
            <img className='cursor-pointer' onClick={diceClicked} src={src} alt={'tärning som visar' + number ? number : showedRoll} style={{
                width: '7rem',
                height: '7rem',
                boxShadow: boxShadow,
                cursor: cursor,
            }} />
        )
    }

    const diceClicked = () => {
        console.log('diceClicked currentDiceRoll:', currentDiceRoll);
        if (!currentDiceRoll) {
            rollDice();
        }
    }

    const rollDice = async () => {
        console.log('Rolling dice');
        axios.get(`http://${window.location.hostname}:4000/dice`)
            .then(async res => {
                setCurrentDiceRoll(res.data);
                await socket.emit('updateGameDiceRoll', {
                    game,
                    newDiceRoll: res.data,
                });
            });
    }

    return (
        <div >
            <Side number={currentDiceRoll} />
        </div>
    )
}

export default Dice;