
function MoveIndicator({ onPiece, players, movePieceToPos, selectedPiece, number, size }) {

    const username = Object.keys(players).find(username => players[username].playerNumber === selectedPiece.playerNumber);
    const color = onPiece ? '255, 0, 0, 0.3' : '0, 255, 0, 0.8';

    return (
        <div className="position-absolute m-0 d-flex align-items-center justify-content-center"
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: `solid rgba(255, 255, 255, 0.4) ${size * 0.2}rem`,
                backgroundColor: `rgba(${color})`,
                cursor: 'pointer',
            }}
            onPointerDown={() => movePieceToPos(username, selectedPiece.number, number)}
        >

        </div>
    )
}

export default MoveIndicator;
