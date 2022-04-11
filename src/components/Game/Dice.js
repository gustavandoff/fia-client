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
                clearInterval(animationInterval);
                showRollTimeOut = setTimeout(async () => { // tärningskastet ska visas i mitten av skärmen i en sekund innan den flyttas till hörnet
                    setCurrentDiceRoll(showedRoll);
                    await socket.emit('updateGameDiceRoll', {
                        game,
                        newDiceRoll: showedRoll,
                    });
                }, 1000);
            } else if (!animationInterval) {
                animationInterval = setInterval(() => { // varje sekund kommer tärningen växla siffra innan man tryckt på den
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
        if (!currentDiceRoll) {
            rollDice()
                .then(async diceRoll => { // rollDice returnerar en promise med träningskastet som körs här
                    setShowedRoll(diceRoll);
                    setIsClicked(true);
                });
        }
    }

    const rollDice = async () => {
        return axios.get(`http://${window.location.hostname}:4000/dice`) // skickar get-request för att få tärningskastet och returnerar promisen
            .then(async res => {
                return res.data;
            });
    }

    const boxShadow = !currentDiceRoll && !isClicked ? `0 0 1rem 1rem white` : '';
    const cursor = !currentDiceRoll && !isClicked ? 'pointer' : 'default';
    const pointerEvents = !currentDiceRoll && !isClicked ? 'auto' : 'none';

    const src = require(`../../assets/images/dice/${currentDiceRoll ? currentDiceRoll : showedRoll}.jpg`);

    return (
        <img onPointerDown={diceClicked} className={`${!currentDiceRoll ? 'position-relative' : 'position-fixed end-0 bottom-0'} `} src={src} alt={'tärning som visar ' + (currentDiceRoll ? currentDiceRoll : showedRoll)} style={{
            boxShadow,
            cursor,
            pointerEvents,
            transform: `translateY(${!currentDiceRoll ? windowDimensions.height * 0.3 : 0}px) scale(${!currentDiceRoll ? 1.5 : 0.8})`,
        }} />

    )
}

export default Dice;