import BoardArm from "./BoardArm";
import FinishStepCircle from "./FinishStepCircle";

const Board = ({ playerCount, circleSize, game, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos, currentUser }) => {

    let distanceFromCenter;
    let v = (Math.PI / 180) * (360 / playerCount); // vinkeln mellan varje arm i radianer
    let d = circleSize;
    const players = game.players;
    const boardArmCount = Object.keys(players).length > 4 ? Object.keys(players).length : 4;

    if (playerCount <= 4) {
        distanceFromCenter = (circleSize / 2);
    } else {
        distanceFromCenter = (d * (Math.cos(v / 2) + 1 / 2) / Math.sin(v / 2)) - (1.5 * d);
    }

    let rotDeg = 360 / playerCount;
    let render = [];

    for (let i = 0; i < boardArmCount; i++) {
        const thisPlayer = players[Object.keys(players).find(u => players[u].playerNumber - 1 === i)]
        const color = thisPlayer ? thisPlayer.color : 'grey';

        render.push(<BoardArm key={i} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} degree={i * rotDeg} circleSize={circleSize} playerCount={playerCount} armNumber={i + 1} />);

    }

    render.push(<FinishStepCircle key={-1} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} size={circleSize} />);

    return (
        <div>
            {render}
        </div>
    );
}

export default Board;