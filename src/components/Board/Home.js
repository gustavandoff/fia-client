import StepCircle from "./StepCircle";
import './game.css';

const Home = ({ degree, size, color, armNumber, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let number = [];

    for (let i = 4; i >= 1; i--) {
        number[i] = -(parseFloat(i) + armNumber * 10);
    }

    return (
        <div className='container' style={{
            width: `${size * 2 + size / 12}rem`,
            height: `${size * 2 + size / 12}rem`,
            backgroundColor: color,
            border: `${size / 15}rem solid black`,
            pointerEvents: 'auto',
            cursor: 'move',
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
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} size={size} degree={degree} number={number[1]} />
            </div>
            <div style={{ gridArea: 'c2' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} size={size} degree={degree} number={number[2]} />
            </div>
            <div style={{ gridArea: 'c3' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} size={size} degree={degree} number={number[3]} />
            </div>
            <div style={{ gridArea: 'c4' }}>
                <StepCircle movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} size={size} degree={degree} number={number[4]} />
            </div>
        </div>
    )
}

export default Home;