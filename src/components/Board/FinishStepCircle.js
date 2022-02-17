import StepCircle from "./StepCircle";

const FinishStepCircle = ({ distanceFromCenter, size, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePiece }) => {

    let pieces;

    const image = require(`../../assets/images/star.png`);

    for (let i = 0; i < players.length; i++) {
        pieces = players[i].pieces.find(p => p.position === -1);
        if (pieces) {
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

    if (pieces) {
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
    }

    return (
        <div className="position-absolute" style={{
            left: `${1.5 * size - distanceFromCenter + distanceFromCenter * (1 - sp)}rem`,
            top: `${2 * -distanceFromCenter + distanceFromCenter * (1 - sp)}rem`,
            width: `${distanceFromCenter * 2 * sp}rem`,
            height: `${distanceFromCenter * 2 * sp}rem`,
            backgroundColor: 'black',
            borderRadius: '50%',
            cursor: 'move',
        }}>
            <div className={circleClass} style={isContainingPiece}>
                <StepCircle movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={'black'} size={size} degree={0} number={-1} />
            </div>
            <img style={starStyle} className={starClass} src={image} width={size * 16} alt='stjärna' />
        </div>
    );
}

export default FinishStepCircle;