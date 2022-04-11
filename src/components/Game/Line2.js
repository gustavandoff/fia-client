import StepCircle from "./StepCircle";

// sträckan efter Line1
const Line2 = ({ degree, size, armNumber, length, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let render = [];

    for (let i = length; i >= 1; i--) { // om det är fyra armar är length 4, annars 3 eftersom hörnet bara finns vid 4 armar
        let number = parseFloat(i) + 1 + armNumber * 10; // första cirkelns nummer är [armnumret]4 eller [armnumret]5. t.ex. 14/15, 24/25 osv. och sista blir [armnumret]2

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