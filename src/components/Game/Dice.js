import { useState, useEffect } from "react";
import axios from 'axios';

const Dice = ({ windowDimensions, currentDiceRoll, setCurrentDiceRoll, socket, game }) => {
    const [showedRoll, setShowedRoll] = useState(1); // det värde som tärningen visar
    const [isClicked, setIsClicked] = useState(false); // om man tryckt på tärningen

    let showRollTimeOut;

    useEffect(() => {
        let animationInterval;
        if (!currentDiceRoll) {
            if (isClicked) {
                clearInterval(animationInterval); // om den är tryckt ska den sluta animeras
                showRollTimeOut = setTimeout(async () => { // tärningskastet ska visas i mitten av skärmen i en sekund innan den flyttas till hörnet
                    setCurrentDiceRoll(showedRoll); // efter en sekund sätts värdet på tärningskastet i spelet till slumptalet man fick
                    await socket.emit('updateGameDiceRoll', { // sedan skickas det till socketen
                        game,
                        newDiceRoll: showedRoll,
                    });
                }, 1000);
            } else if (!animationInterval) { // om animationen inte redan är igång
                animationInterval = setInterval(() => { // varje sekund kommer tärningen växla siffra innan man tryckt på den
                    setShowedRoll((oldRoll) => oldRoll === 6 ? 1 : oldRoll + 1); // varje gång ökar värdet på siffran
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
                .then(async diceRoll => { // rollDice returnerar en promise som returnerar träningskastet här
                    setShowedRoll(diceRoll);
                    setIsClicked(true);
                });
        }
    }

    const rollDice = async () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    const boxShadow = !currentDiceRoll && !isClicked ? `0 0 1rem 1rem white` : ''; // innan tärningen är tryckt ska den "lysa"
    const cursor = !currentDiceRoll && !isClicked ? 'pointer' : 'default'; // cursor blir pointer eller default beroende på man kan kan trycka på den
    const pointerEvents = !currentDiceRoll && !isClicked ? 'auto' : 'none'; // pointer-events blir auto eller none beroende på man kan kan trycka på den

    const src = require(`../../assets/images/dice/${currentDiceRoll ? currentDiceRoll : showedRoll}.jpg`); // tärningsbilden

    return (
        <img onPointerDown={diceClicked} className={`${!currentDiceRoll ? 'position-relative' : 'position-fixed end-0 bottom-0'} `} src={src} alt={'tärning som visar ' + (currentDiceRoll ? currentDiceRoll : showedRoll)} style={{
            boxShadow,
            cursor,
            pointerEvents,
            transform: `translateY(${!currentDiceRoll ? windowDimensions.height * 0.3 : 0}px) scale(${!currentDiceRoll ? 1.5 : 0.8})`, // först är den i mitten av skärmen. Sedan hamnar den i hörnet
        }} />

    )
}

export default Dice;