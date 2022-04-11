import BoardArm from "./BoardArm";
import FinishStepCircle from "./FinishStepCircle";

const Board = ({ windowDimensions, playerCount, circleSize, game, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos, currentUser }) => {
    let distanceFromCenter; // avståndet från centrum av spelplanen till den cirkel i varje arm som ligger nämrast centrum
    let v = (Math.PI / 180) * (360 / playerCount); // vinkeln mellan varje arm i radianer
    let d = circleSize;

    if (playerCount <= 4) {
        distanceFromCenter = (circleSize / 2); // om man är fyra spelare är avståndet en halv cirkel
    } else {
        distanceFromCenter = (d * (Math.cos(v / 2) + 1 / 2) / Math.sin(v / 2)) - (1.5 * d) // en formel jag fick fram för att beräkna avståndet beroende på vinkeln mellan varje arm
    }

    let homeDistanceFromCenter = { top: null, right: null };

    switch (playerCount) { // beroende på antalet spelare hamnar hemmet på olika positioner för att få plats
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

    let boardSize = distanceFromCenter * 2 * circleSize + circleSize * (playerCount % 2 === 0 ? 10 : 12); // spelbrädets storlek från kant till kant
    const topHomeDistance = (homeDistanceFromCenter.top + distanceFromCenter / 2 + 2) * circleSize; // avståndet från centrum till hemmets ytterkant

    if (topHomeDistance > boardSize / 2) { // boardSize räknar inte med hemmen så om hemmen hamnar utanför brädet sätts boardSize till 2 topHomeDistance
        boardSize = topHomeDistance * 2;
    }

    
    // retunerar brädets storlektsfaktor
    const getSizeMultiplier = () => {
        let result = windowDimensions.width / 500; // en lagom storlek på brädet beroende på webbflikens/skärmens storlek
        const remHeight = windowDimensions.height / 16; // skärmens höjd i enheten rem
        const remWidth = windowDimensions.width / 16; // skärmens höjd i enheten rem
        const boardScreenHeight = (182 - 3 * playerCount) / 100 * (5 + result * boardSize / 2); // brädets höjd pluss lite marginal uppe och nere

        if (boardScreenHeight > remHeight) { // om brädet börjar sträcka sig utanför skärmens höjd
            result = 2 / boardSize * (100 * remHeight / (182 - 3 * playerCount) - 5); // brädet ska då påverkas av höjden och inte bredden av skärmen
        }

        const boardScreenWidth = (47 - playerCount) / 25 * (5 + result * boardSize / 2); // brädets bredd pluss lite marginal åt sidorna

        if (boardScreenWidth > remWidth) { // om brädet börjar sträcka sig utanför skärmens bredd
            result = 2 / boardSize * (25 * remWidth / (47 - playerCount) - 5); // brädet ska då påverkas av bredden och inte höjden av skärmen
        }

        return result;
    }

    const players = game.players;
    const boardArmCount = Object.keys(players).length > 4 ? Object.keys(players).length : 4; // antal armar är minst 4

    let rotDeg = 360 / playerCount; // vinkeln mellan varje arm
    let render = [];

    for (let i = 0; i < boardArmCount; i++) {
        const thisPlayer = players[Object.keys(players).find(u => players[u].playerNumber - 1 === i)] // spelaren som har spelarnummret i + 1
        const color = thisPlayer ? thisPlayer.color : 'grey'; // om den spelaren inte hittas blir armen grå

        //Varje utsträckande del av brädet är en arm som roteras i * rotDeg
        render.push(<BoardArm key={i} distanceFromCenter={distanceFromCenter} homeDistanceFromCenter={homeDistanceFromCenter} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} degree={i * rotDeg} circleSize={circleSize} playerCount={playerCount} armNumber={i + 1} />);

    }

    // Cirkeln i mitten av brädet som är målet
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