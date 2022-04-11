import StepCircle from "./StepCircle";

// den sträcka där första, sista och näst sista cirkeln runt spelbrädet ingår
const Line1 = ({ degree, size, color, armNumber, playerCount, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {
    
    let startCircleNumber = 1 + armNumber * 10; // första cirkelns nummer är [armnumret]1. t.ex. 11, 21, 31 osv.
    let number;

    if (armNumber === 1)
        number = 10 + playerCount * 10; // om det är första cirkeln på hela brädet ska den förgående bli den sista dvs [antalet spelare]9. t.ex. 49, 59, 69
    else
        number = startCircleNumber - 1; // annars är föregående cirkel ett nummer mindre

    if (playerCount > 4) // när det är fler en fyra spelare är det 9 cirklar från arm till arm istället för 10 så föregående cirkel måste minska ett extra
        number--;

    return (
        <div className="container" style={{
            width: `${size}rem`,
            position: 'absolute',
            transformOrigin: `0 -${size / 2}rem`,

        }}>
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree - 90} number={startCircleNumber} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color='tan' size={size} degree={degree - 90} number={number} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color='tan' size={size} degree={degree - 90} number={number - 1} />
        </div>
    );
}

export default Line1;