
function MoveIndicator({ players, movePieceToPos, selectedPiece, number }) {

    const player = players.find(p => p.playerNumber === selectedPiece.playerNumber);

    return (
        <div className="position-absolute m-0 d-flex align-items-center justify-content-center"
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: 'solid rgba(255, 255, 255, 0.8) 5px',
                backgroundColor: 'rgba(0, 255, 0, 0.8)',
                cursor: 'pointer',
                //display: 'inline-block',
            }}
            onPointerDown={() => movePieceToPos(player.username, selectedPiece.number, number)}
        >

        </div>
    )
}

export default MoveIndicator;
