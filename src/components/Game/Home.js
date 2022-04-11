import StepCircle from "./StepCircle";
import './game.css';

// Hemmet där pjäserna startas och hamnar om de blir utknuffade
const Home = ({ degree, size, color, armNumber, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let number = [];

    for (let i = 4; i >= 1; i--) {
        number[i] = -(parseFloat(i) + armNumber * 10); // första cirkelns nummer är -[armnumret]4. t.ex. -14, -24, -34 osv. och sista blir -[armnumret]1
    }

    // kollar om det är hemmets spelares tur
    const isMyTurn = () => {
        const username = Object.keys(game.players).find(u => game.players[u].playerNumber === armNumber);
        return game.turn === username;
    }

    const boxShadow = isMyTurn() ? `0 0 ${size / 4}rem ${size / 4}rem ${color}` : ''; // det hem vars spelares tur det är kommer att "lysa"
    return (
        <div className='container' style={{
            width: `${size * 2 + size / 12}rem`,
            height: `${size * 2 + size / 12}rem`,
            backgroundColor: color,
            border: `${size / 15}rem solid black`,
            boxShadow: boxShadow,
            borderRadius: '25%',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            gridTemplateRows: '50% 50%',
            gridTemplateAreas: `
                                'c1 c2'
                                'c3 c4'
                            `,
        }}>
            <div style={{ gridArea: 'c1' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={number[1]} />
            </div>
            <div style={{ gridArea: 'c2' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={number[2]} />
            </div>
            <div style={{ gridArea: 'c3' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={number[3]} />
            </div>
            <div style={{ gridArea: 'c4' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} size={size} degree={degree} number={number[4]} />
            </div>
        </div>
    )
}

export default Home;