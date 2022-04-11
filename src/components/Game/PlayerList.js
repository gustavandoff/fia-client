const PlayerList = ({ players, game, windowDimensions }) => {
    const isBottomPositioned = windowDimensions.height > windowDimensions.width;
    
    const PlayerListItem = ({ player }) => {

        const pieceImg = require(`../../assets/images/pieces/${player.color}.png`);
        let renderPieces = [];

        Object.keys(player.pieces).forEach((piece, i) => {

            if (player.pieces[piece].position) {
                renderPieces.push(
                    <img key={i} className={`player-list-piece align-bottom`} src={pieceImg} alt={player.color}></img>
                );
            }
        })

        return (
            <div className={`d-flex my-1 px-2 ${isBottomPositioned ? 'border-start border-end border-dark' : ''}`}>
                <h4 className="font-size-1 my-0 me-1">{player.username}</h4>
                {renderPieces}
            </div>

        )
    }

    let renderPlayerList = [];

    Object.keys(players).forEach((player, i) => {
        renderPlayerList.push(
            <PlayerListItem key={i} player={players[player]} />
        )
    });

    let thisClassName;
    if (isBottomPositioned) {
        thisClassName = 'd-flex bottom-0 text-wrap';
    } else {
        thisClassName = 'top-10';
    }

    return (
        <div className={`position-fixed ms-3 ${thisClassName}`}>
            {renderPlayerList}
        </div>
    )
}

export default PlayerList;