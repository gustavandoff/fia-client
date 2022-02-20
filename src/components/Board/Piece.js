const Piece = ({ size, piece, setSelectedPiece, selectedPiece, player, stacked }) => {

    const thisPiece = {
        playerNumber: player.playerNumber,
        number: piece.number,
        position: piece.position
    };

    const comparePieces = (p1, p2) => {
        if (p1 == null || p2 == null) return false;
        return p1.playerNumber === p2.playerNumber & p1.number === p2.number & p1.position === p2.position;
    }

    let pieceClass = 'position-absolute';

    if (comparePieces(selectedPiece, thisPiece)) {
        pieceClass += ' piece-selected';
    }

    const selectPiece = () => {
        if (comparePieces(selectedPiece, thisPiece)) {
            setSelectedPiece(0);
        } else {
            setSelectedPiece(thisPiece);
        }
    }

    const image = require(`../../assets/images/pieces/${piece.color}.png`);

    return (
        <div className="align-items-center"
            style={{
                cursor: 'pointer',
            }}
            onPointerDown={selectPiece}
        >
            <img className={pieceClass} width='80%' src={image} alt='spelpjäs'
                style={{
                    bottom: `${size * 0.2 + stacked}rem`,
                }}></img>

        </div>
    )
}

export default Piece;