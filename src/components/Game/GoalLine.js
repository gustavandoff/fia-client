import StepCircle from "./StepCircle";

// Den färgade sträckan på varje arm precis innan målet
const GoalLine = ({ color, degree, armNumber, size, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let startCircleNumber = -6 - armNumber * 10; // första cirkelns nummer är -[armnumret]6. t.ex. -16, -26, -36 osv. och sista blir -[armnumret]9

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