const Piece = ({ size, piece, setSelectedPiece, selectedPiece, player, stacked, game, currentUser }) => {

    const thisPiece = {
        playerNumber: player.playerNumber,
        number: piece.number,
        position: piece.position
    };

    const isMyTurn = () => {
        return game.turn === player.username;
    }

    const isMyPiece = () => { // om denna pjäs tillhör den inloggade användaren
        return player.username === currentUser.username;
    }

    const comparePieces = (p1, p2) => { // jämför om två pjäser är samma
        if (p1 == null || p2 == null) return false;
        return p1.playerNumber === p2.playerNumber & p1.number === p2.number & p1.position === p2.position;
    }

    let pieceClass = 'position-absolute';

    if (comparePieces(selectedPiece, thisPiece)) { // om denna pjäs är den markerade pjäsen
        pieceClass += ' piece-selected';
    }

    const selectPiece = () => { // när man trycker på pjäsen
        if (comparePieces(selectedPiece, thisPiece)) {
            setSelectedPiece(0); // om denna pjäs redan är markerad ska den avmarkeras
        } else {
            setSelectedPiece(thisPiece); // annars markeras den
        }
    }

    const image = require(`../../assets/images/pieces/${player.color}.png`);

    return (
        <div onPointerDown={isMyTurn() && isMyPiece() ? selectPiece : () => { }} className={`d-flex align-items-center justify-content-center ${isMyTurn() && isMyPiece() ? 'cursor-pointer' : ''}`}>
            <img className={pieceClass} width='100' src={image} alt='spelpjäs'
                style={{
                    width: `70%`,
                    bottom: `${size * 0.1 + stacked}rem`,
                    transform: 'scale(99%)', // måste vara 99% inte 100% annars blir det knas med storleken ???
                }}></img>

        </div>
    )
}

export default Piece;