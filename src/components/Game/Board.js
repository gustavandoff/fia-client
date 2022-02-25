import BoardArm from "./BoardArm";
import FinishStepCircle from "./FinishStepCircle";

const Board = ({ playerCount, circleSize, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let distanceFromCenter;
    let v = (Math.PI / 180) * (360 / playerCount); // vinkeln mellan varje arm i radianer
    let d = circleSize;

    if (playerCount <= 4) {
        distanceFromCenter = (circleSize / 2);
    } else {
        distanceFromCenter = (d * (Math.cos(v / 2) + 1 / 2) / Math.sin(v / 2)) - (1.5 * d);
    }

    let rotDeg = 360 / playerCount;
    let render = [];

    for (let i = 0; i < playerCount; i++) {

        const color = players[i] ? players[i].color : 'grey';

        render.push(<BoardArm key={i} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} degree={i * rotDeg} circleSize={circleSize} playerCount={playerCount} armNumber={i + 1} />);

    }

    render.push(<FinishStepCircle key={-1} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} size={circleSize} />);

    return (
        <div>
            {render}
        </div>
    );
}

export default Board;