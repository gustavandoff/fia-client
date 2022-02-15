import StepCircle from "./StepCircle";

const Line2 = ({ degree, size, armNumber, length, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePiece }) => {

    let render = [];

    for (let i = length; i >= 1; i--) {
        let number = parseFloat(i) + 1 + armNumber * 10;

        render.push(<StepCircle key={i} movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color='tan' size={size} degree={degree} number={number} />);
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