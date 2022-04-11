// Listan av spelare i ett spel bredvid spelbrädet
const PlayerList = ({ players, game, windowDimensions }) => {
    const isPortrait = windowDimensions.height > windowDimensions.width; // om skärmens höjd är större än bredden
    
    const PlayerListItem = ({ player }) => {

        const pieceImg = require(`../../assets/images/pieces/${player.color}.png`);
        let renderPieces = [];

        Object.keys(player.pieces).forEach((piece, i) => { // går igenom spelarens pjäser

            if (player.pieces[piece].position) { // om pjäsen har en position dvs den ar inte gått ut läggs den till i listan som ritas ut
                renderPieces.push(
                    <img key={i} className={`player-list-piece align-bottom`} src={pieceImg} alt={player.color}></img>
                );
            }
        })

        return (
            <div className={`d-flex my-1 px-2 ${isPortrait ? 'border-start border-end border-dark' : ''}`}>
                <h4 className="font-size-1 my-0 me-1">{player.username}</h4>
                {renderPieces}
            </div>

        )
    }

    let renderPlayerList = [];

    Object.keys(players).forEach((player, i) => { // går igenom alla spelare och skriver ut dem
        renderPlayerList.push(
            <PlayerListItem key={i} player={players[player]} />
        )
    });

    let thisClassName;
    if (isPortrait) {
        thisClassName = 'd-flex bottom-0 text-wrap'; // listan positioneras längst ner på skärmen
    } else {
        thisClassName = 'top-10'; // listan positioneras på sidan av skärmen
    }

    return (
        <div className={`position-fixed ms-3 ${thisClassName}`}>
            {renderPlayerList}
        </div>
    )
}

export default PlayerList;