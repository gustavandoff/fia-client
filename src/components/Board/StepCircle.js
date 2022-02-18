import Piece from "./Piece";
import MoveIndicator from "./MoveIndicator";

const StepCircle = ({ color, size, degree, number, players, setSelectedPiece, selectedPiece, moveIndicator, movePieceToPos }) => {
    
    let pieces = [];
    let player;
    let renderElements = [];

    for (let i = 0; i < players.length; i++) {
        pieces = players[i].pieces.filter(p => p.position === number);
        player = players[i];
        if (pieces.length > 0) {
            break;
        }
    }

    pieces.forEach((piece, i) => {
        renderElements.push(<Piece key={i} i={i} player={player} size={size} piece={piece} setSelectedPiece={setSelectedPiece} selectedPiece={selectedPiece} />);
    });

    renderElements.push(moveIndicator.find(m => m === number) ? <MoveIndicator key={renderElements.length} players={players} movePieceToPos={movePieceToPos} selectedPiece={selectedPiece} number={number} /> : '');

    if (renderElements[0] === undefined || renderElements[0] === '') {
        renderElements.push(
            //<p key={5000} style={{ fontSize: `${6 * size}px` }}>{number}</p>
        );
    }

    return (
        <div style={{
            width: `${size}rem`,
            height: `${size}rem`,
            textAlign: 'center'
        }} className='m-0 d-flex align-items-center justify-content-center'>
            <div style={{
                width: '90%',
                height: '90%',
                backgroundColor: color,
                borderRadius: '50%',
                border: `${size / 12}rem solid black`,
                transform: `rotate(${-degree}deg)`,
                pointerEvents: 'auto',
                cursor: 'move',
                zIndex: '0',
            }}>
                {renderElements}
            </div>
        </div>
    );
}

export default StepCircle;