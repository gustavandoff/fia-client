import { useState, useEffect } from "react";
import axios from 'axios';

const Dice = ({ windowDimensions, currentDiceRoll, setCurrentDiceRoll, socket, game }) => {
    const [showedRoll, setShowedRoll] = useState(1);
    const [isClicked, setIsClicked] = useState(false);

    let showRollTimeOut;

    useEffect(() => {
        let animationInterval;
        if (!currentDiceRoll) {
            if (isClicked) {
                console.log('--------------------------------------------------');
                console.log('showRollTimeOut:', showRollTimeOut);
                clearInterval(animationInterval);
                showRollTimeOut = setTimeout(async () => {
                    setCurrentDiceRoll(showedRoll);
                    await socket.emit('updateGameDiceRoll', {
                        game,
                        newDiceRoll: showedRoll,
                    });
                }, 1000);

                console.log('showRollTimeOut 2:', showRollTimeOut);
            } else if (!animationInterval) {
                animationInterval = setInterval(() => {
                    setShowedRoll((oldRoll) => oldRoll === 6 ? 1 : oldRoll + 1);
                }, 1000);
            }
        }


        return () => {
            clearInterval(animationInterval);
            clearTimeout(showRollTimeOut);
        }
    }, [isClicked]);

    const diceClicked = async () => {
        console.log('diceClicked currentDiceRoll:', currentDiceRoll);
        if (!currentDiceRoll) {
            rollDice()
                .then(async diceRoll => {
                    console.log('Rolled ', diceRoll);
                    setShowedRoll(diceRoll);
                    setIsClicked(true);
                });
        }
    }

    const rollDice = async () => {
        console.log('Rolling dice');
        return axios.get(`http://${window.location.hostname}:4000/dice`)
            .then(async res => {
                console.log('axios roll dice res.data:', res.data);
                const data = res.data;
                return data;
            });
    }

    const boxShadow = !currentDiceRoll && !isClicked ? `0 0 1rem 1rem white` : '';
    const cursor = !currentDiceRoll && !isClicked ? 'pointer' : 'default';

    const src = require(`../../assets/images/dice/${currentDiceRoll ? currentDiceRoll : showedRoll}.jpg`);

    return (
        <img onPointerDown={diceClicked} className={`${!currentDiceRoll ? 'position-relative' : 'position-fixed end-0 bottom-0'} pe-auto`} src={src} alt={'tärning som visar ' + (currentDiceRoll ? currentDiceRoll : showedRoll)} style={{
            boxShadow,
            cursor,
            transform: `translateY(${!currentDiceRoll ? windowDimensions.height * 0.3 : 0}px) scale(${!currentDiceRoll ? 1.5 : 0.8})`,
        }} />

    )
}

export default Dice;