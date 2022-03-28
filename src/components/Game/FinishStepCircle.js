import StepCircle from "./StepCircle";

const FinishStepCircle = ({ distanceFromCenter, size, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let piece;
    let player;
    const players = game.players;

    const image = require(`../../assets/images/star.png`);

    for (let i = 0; i < Object.keys(players).length; i++) {
        player = players[Object.keys(players)[i]];
        piece = player.pieces.find(p => p.position === -1);
        if (piece) {
            break;
        }
    }

    const sp = 0.9;

    let isContainingPiece = {
        left: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
        top: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
    };

    let circleClass = 'position-absolute';
    let starClass = 'position-absolute';
    let starStyle = { transform: 'scale(0)' };

    if (piece) { // målcirkeln innehåller en pjäs. dvs någon har gått ut
        isContainingPiece = {
            left: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
            top: `${2 * ((distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp))}rem`,
            transformOrigin: `50% -${distanceFromCenter - size - distanceFromCenter * (1 - sp)}rem`,
        };
        circleClass += ' is-containing-piece';
        starClass += ' appear';
        starStyle = {
            left: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
            top: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
            width: 'size',
            height: 'size',
        };

        setTimeout(() => {
            movePieceToPos(player.username, piece.number, null);
        }, 4000);
    }

    return (
        <div className="position-absolute" style={{
            left: `${1.5 * size - distanceFromCenter + distanceFromCenter * (1 - sp)}rem`,
            top: `${2 * -distanceFromCenter + distanceFromCenter * (1 - sp)}rem`,
            width: `${distanceFromCenter * 2 * sp}rem`,
            height: `${distanceFromCenter * 2 * sp}rem`,
            backgroundColor: 'black',
            borderRadius: '50%',
        }}>
            <div className={circleClass} style={isContainingPiece}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={''} size={size} degree={0} number={-1} />
            </div>
            <img style={starStyle} className={starClass} src={image} width={size * 16} alt='stjärna' />
        </div>
    );
}

export default FinishStepCircle;