import StepCircle from "./StepCircle";

// Cirkeln i mitten av brädet som är målet
const FinishStepCircle = ({ distanceFromCenter, size, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let piece;
    let player;
    const players = game.players;

    const image = require(`../../assets/images/star.png`);

    for (let i = 0; i < Object.keys(players).length; i++) { // försöker leta om det står någon pjäs på sig
        player = players[Object.keys(players)[i]];
        piece = player.pieces.find(p => p.position === -1);
        if (piece) {
            break;
        }
    }

    const sp = 0.9;

    let thisStyle = {
        left: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`, // positioneras så den hamnar i mitten av brädet
        top: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`, // positioneras så den hamnar i mitten av brädet
    };

    let circleClass = 'position-absolute';
    let starClass = 'position-absolute';
    let starStyle = { transform: 'scale(0)' };

    if (piece) { // kollar om målcirkeln innehåller en pjäs. dvs om någon har gått ut
        thisStyle = {
            left: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
            top: `${2 * ((distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp))}rem`,
            transformOrigin: `50% -${distanceFromCenter - size - distanceFromCenter * (1 - sp)}rem`,
        };
        circleClass += ' is-containing-piece'; // denna class startar animationen som snurrar och försvinner
        starClass += ' appear'; // denna class startar animationen som snurrar och försvinner
        starStyle = {
            left: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
            top: `${(distanceFromCenter - 0.5 * size) - distanceFromCenter * (1 - sp)}rem`,
            width: 'size',
            height: 'size',
        };

        setTimeout(() => {
            movePieceToPos(player.username, piece.number, null); // efter 4 sekunder när animationen körts kommer pjäsen tas bort från spelet
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
            <div className={circleClass} style={thisStyle}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={''} size={size} degree={0} number={-1} />
            </div>
            <img style={starStyle} className={starClass} src={image} width={size * 16} alt='stjärna' />
        </div>
    );
}

export default FinishStepCircle;