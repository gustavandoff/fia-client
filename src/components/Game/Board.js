import BoardArm from "./BoardArm";
import FinishStepCircle from "./FinishStepCircle";

const Board = ({ windowDimensions, playerCount, circleSize, game, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos, currentUser }) => {
    let distanceFromCenter;
    let v = (Math.PI / 180) * (360 / playerCount); // vinkeln mellan varje arm i radianer
    let d = circleSize;

    if (playerCount <= 4) {
        distanceFromCenter = (circleSize / 2);
    } else {
        distanceFromCenter = (d * (Math.cos(v / 2) + 1 / 2) / Math.sin(v / 2)) - (1.5 * d)
    }

    let homeDistanceFromCenter = { top: null, right: null };

    switch (playerCount) {
        case 4:
            homeDistanceFromCenter.top = 2.5 * circleSize;
            homeDistanceFromCenter.right = 4 * circleSize;
            break;
        case 5:
            homeDistanceFromCenter.top = 2.5 * circleSize;
            homeDistanceFromCenter.right = 3 * circleSize;
            break;
        case 6:
            homeDistanceFromCenter.top = 2.7 * circleSize;
            homeDistanceFromCenter.right = 2.7 * circleSize;
            break;
        case 7:
            homeDistanceFromCenter.top = 3 * circleSize;
            homeDistanceFromCenter.right = 2.7 * circleSize;
            break;
        case 8:
            homeDistanceFromCenter.top = 3.6 * circleSize;
            homeDistanceFromCenter.right = 2.7 * circleSize;
            break;
        case 9:
            homeDistanceFromCenter.top = 4 * circleSize;
            homeDistanceFromCenter.right = 2.7 * circleSize;
            break;
        default:
            homeDistanceFromCenter.top = 5.1 * circleSize;
            homeDistanceFromCenter.right = 0.5 * circleSize;
            break;
    }

    let boardSize = distanceFromCenter * 2 * circleSize + circleSize * (playerCount % 2 === 0 ? 10 : 12)
    const topHomeDistance = (homeDistanceFromCenter.top + distanceFromCenter / 2 + 2) * circleSize;

    if (topHomeDistance > boardSize / 2) {
        boardSize = topHomeDistance * 2;
    }

    

    const getSizeMultiplier = () => {
        let result = windowDimensions.width / 500;
        const remHeight = windowDimensions.height / 16;
        const remWidth = windowDimensions.width / 16;
        const boardScreenHeight = (182 - 3 * playerCount) / 100 * (5 + result * boardSize / 2); // brädets höjd pluss lite marginal uppe och nere

        if (boardScreenHeight > remHeight) { // om brädet börjar sträcka sig utanför skärmens höjd
            result = 2 / boardSize * (100 * remHeight / (182 - 3 * playerCount) - 5);
        }

        const boardScreenWidth = (47 - playerCount) / 25 * (5 + result * boardSize / 2); // brädets bredd pluss lite marginal uppe och nere

        if (boardScreenWidth > remWidth) { // om brädet börjar sträcka sig utanför skärmens bredd
            result = 2 / boardSize * (25 * remWidth / (47 - playerCount) - 5);
        }

        return result;
    }

    const players = game.players;
    const boardArmCount = Object.keys(players).length > 4 ? Object.keys(players).length : 4;

    let rotDeg = 360 / playerCount;
    let render = [];

    for (let i = 0; i < boardArmCount; i++) {
        const thisPlayer = players[Object.keys(players).find(u => players[u].playerNumber - 1 === i)]
        const color = thisPlayer ? thisPlayer.color : 'grey';

        render.push(<BoardArm key={i} distanceFromCenter={distanceFromCenter} homeDistanceFromCenter={homeDistanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} degree={i * rotDeg} circleSize={circleSize} playerCount={playerCount} armNumber={i + 1} />);

    }

    render.push(<FinishStepCircle key={-1} distanceFromCenter={distanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} size={circleSize} />);

    return (
        <div className="position-relative bottom-0" style={{
            transform: `translate(${-circleSize * 1.5 * getSizeMultiplier()}rem, ${5 + getSizeMultiplier() * boardSize / 2}rem) scale(${getSizeMultiplier()})`,
        }}>
            {render}
        </div>
    );
}

export default Board;