import StepCircle from "./StepCircle";

const Line3 = ({ degree, size, armNumber, playerCount, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let startCircleNumber = 1 + armNumber * 10;
    let number;

    if (armNumber === 1)
        number = 8 + playerCount * 10;
    else
        number = startCircleNumber - 3;

    if (playerCount > 4)
        number--;

    return (
        <div className="container" style={{
            width: `${size}rem`,
            position: 'absolute',
            transformOrigin: `0 -${size / 2}rem`,

        }}>
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color='tan' size={size} degree={degree} number={number} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color='tan' size={size} degree={degree} number={number - 1} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color='tan' size={size} degree={degree} number={number - 2} />
        </div>
    );
}

export default Line3;