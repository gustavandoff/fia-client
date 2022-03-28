import StepCircle from "./StepCircle";

const GoalLine = ({ color, degree, armNumber, size, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let startCircleNumber = -6 - armNumber * 10;

    return (
        <div className="position-absolute container" style={{
            width: `${size}rem`,
            transformOrigin: `50% -${size / 2}rem`,

        }}>
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={startCircleNumber} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={startCircleNumber - 1} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={startCircleNumber - 2} />
            <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={startCircleNumber - 3} />
        </div>
    );
}

export default GoalLine;