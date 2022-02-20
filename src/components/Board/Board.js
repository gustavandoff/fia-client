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
    let playerNumberRenderOrder = [];
    let topHalfPlayerNumbers = [];
    const middlePlayerCountNumber = Math.round(playerCount / 2);
    const oddPlayerCountAdjustment = playerCount % 2 === 0 ? 0 : 1;
    let render = [];

    for (let i = 0; i < playerCount / 2 - oddPlayerCountAdjustment; i++) { // gör en lista på ordingen hur armarna ska renderas. Från högst upp på skärmen till längst ner på skärmen
        playerNumberRenderOrder.push(middlePlayerCountNumber + i);
        playerNumberRenderOrder.push(middlePlayerCountNumber - (i + 1));
    }

    if (oddPlayerCountAdjustment) {
        playerNumberRenderOrder.push(0);
    }


    for (let i = 0; i < (playerNumberRenderOrder.length - 1) / 2 - 1; i++) {
        topHalfPlayerNumbers.push(playerNumberRenderOrder[i]);
    }

    console.log(topHalfPlayerNumbers);
    console.log(playerNumberRenderOrder);

    for (let i = 0; i < playerCount; i++) {
        const index = playerNumberRenderOrder[i];
        const color = players[index] ? players[index].color : 'grey';

        render.push(<BoardArm key={index} topHalfPlayerNumbers={topHalfPlayerNumbers} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} degree={index * rotDeg} circleSize={circleSize} playerCount={playerCount} armNumber={index + 1} />);
    }

    render.push(<FinishStepCircle key={-1} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} size={circleSize} />);

    return (
        <div style={{
            transform: `rotate(0deg)`,
            position: 'relative',
            zIndex: 0,
        }}>
            {render}
        </div>
    );
}

export default Board;