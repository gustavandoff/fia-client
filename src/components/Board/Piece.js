const Piece = ({ size, piece, setSelectedPiece, selectedPiece, player }) => {

    const thisPiece = {
        playerNumber: player.playerNumber,
        number: piece.number,
        position: piece.position
    };

    const comparePieces = (p1, p2) => {
        if (p1 == null || p2 == null) return false;
        return p1.player === p2.player & p1.number === p2.number & p1.position === p2.position;
    }

    let markSelected = comparePieces(selectedPiece, thisPiece) ? 'rgba(255, 255, 255, 0) solid 1px' : '';

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
                width: `${size * 0.65}rem`,
                border: markSelected,
                cursor: 'pointer',
                display: 'inline-block',
            }}
            onPointerDown={selectPiece}
        >
            <img className="position-relative" src={image} alt='spelpjäs'
                style={{
                    width: '100%',
                    bottom: `${size * 0.2}rem`,
                    margin: 'auto',
                    display: 'inline-block',
                }}></img>

        </div>
    )
}

export default Piece;