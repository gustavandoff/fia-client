import Piece from "./Piece";
import MoveIndicator from "./MoveIndicator";

const StepCircle = ({ color, size, degree, number, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, movePieceToPos }) => {

    let pieces = [];
    let player;
    let renderElements = [];
    const players = game.players;

    for (let i = 0; i < Object.keys(players).length; i++) {
        player = players[Object.keys(players)[i]];
        pieces = player.pieces.filter(p => p.position === number);
        if (pieces.length > 0) {
            break;
        }
    }

    pieces.forEach((piece, i) => {
        renderElements.push(<Piece key={i} i={i} stacked={i * size * 0.1} player={player} size={size} game={game} currentUser={currentUser} piece={piece} setSelectedPiece={setSelectedPiece} selectedPiece={selectedPiece} />);
    });

    if (moveIndicator.find(m => m === number)) {
        renderElements.push(<MoveIndicator key={renderElements.length} onPiece={pieces.length > 0} size={size} players={players} movePieceToPos={movePieceToPos} selectedPiece={selectedPiece} number={number} />);
    }

    if (renderElements[0] === undefined) {
        renderElements.push(
            //<p key={5000} style={{ fontSize: `${6 * size}px` }}>{number}</p>
        );
    }

    return (
        <div className={`d-flex align-items-center justify-content-center pe-auto`}
            style={{
                width: `${size}rem`,
                height: `${size}rem`,
                textAlign: 'center'
            }}>
            <div style={{
                width: '90%',
                height: '90%',
                backgroundColor: color,
                borderRadius: '50%',
                border: `${size / 12}rem solid black`,
                transform: `rotate(${-degree}deg)`,
            }}>
                {renderElements}
            </div>
        </div>
    );
}

export default StepCircle;