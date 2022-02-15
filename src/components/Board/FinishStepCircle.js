import StepCircle from "./StepCircle";

const FinishStepCircle = ({ distanceFromCenter, size, number, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePiece }) => {

    let pieces;

    for (let i = 0; i < players.length; i++) {
        pieces = players[i].pieces.find(p => p.position === number);
        if (pieces) {
            console.log('breaking loop')
            break;
        }
    }

    const isContainingPiece = pieces ? 'is-containing-piece' : '';
    
    return (
        <div className="position-absolute finish-step-circle" style={{
            left: `${1.5 * size - distanceFromCenter}rem`,
            top: `${2 * -distanceFromCenter}rem`,
        }}>
            <div className={isContainingPiece}>
                <StepCircle movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={'black'} size={distanceFromCenter * 2} degree={0} number={-1} />
            </div>
        </div>
    );
}

export default FinishStepCircle;