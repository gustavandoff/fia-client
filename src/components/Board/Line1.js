import StepCircle from "./StepCircle";

const Line1 = ({ degree, size, color, armNumber, playerCount, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {
    
    let startCircleNumber = 1 + armNumber * 10;
    let number;

    if (armNumber === 1)
        number = 10 + playerCount * 10;
    else
        number = startCircleNumber - 1;

    if (playerCount > 4)
        number--;

    return (
        <div className="container" style={{
            width: `${size}rem`,
            position: 'absolute',
            transformOrigin: `0 -${size / 2}rem`,

        }}>
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} size={size} degree={degree - 90} number={startCircleNumber} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color='tan' size={size} degree={degree - 90} number={number} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color='tan' size={size} degree={degree - 90} number={number - 1} />
        </div>
    );
}

export default Line1;