import StepCircle from "./StepCircle";

const Line2 = ({ degree, size, armNumber, length, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let render = [];

    for (let i = length; i >= 1; i--) {
        let number = parseFloat(i) + 1 + armNumber * 10;

        render.push(<StepCircle key={i} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color='tan' size={size} degree={degree} number={number} />);
    }

    return (
        <div className="container" style={{
            width: `${size}rem`,
            position: 'absolute',
            transformOrigin: `0 -${size / 2}rem`,

        }}>
            {render}
        </div>
    );
}

export default Line2;