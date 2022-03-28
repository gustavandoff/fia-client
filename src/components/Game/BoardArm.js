import Line1 from './Line1';
import Line2 from './Line2';
import Line3 from './Line3';
import GoalLine from './GoalLine';
import Home from './Home';

const BoardArm = ({ distanceFromCenter, color, degree, circleSize, playerCount, armNumber, game, currentUser, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    let stepLine2;

    if (playerCount <= 4) {
        stepLine2 =
            <div className='col'>
                <Line2 movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} degree={degree} size={circleSize} length='4' armNumber={armNumber} />
            </div>
    } else {
        stepLine2 =
            <div className='col position-relative' style={{ top: `${circleSize}rem` }}>
                <Line2 movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} degree={degree} size={circleSize} length='3' armNumber={armNumber} />
            </div>
    }

    let topHomeDistanceFromCenter;
    let rightHomeDistanceFromCenter;

    switch (playerCount) {
        case 4:
            topHomeDistanceFromCenter = 2.5 * circleSize;
            rightHomeDistanceFromCenter = 4 * circleSize;
            break;
        case 5:
            topHomeDistanceFromCenter = 2.5 * circleSize;
            rightHomeDistanceFromCenter = 3 * circleSize;
            break;
        case 6:
            topHomeDistanceFromCenter = 2.7 * circleSize;
            rightHomeDistanceFromCenter = 2.7 * circleSize;
            break;
        case 7:
            topHomeDistanceFromCenter = 3 * circleSize;
            rightHomeDistanceFromCenter = 2.7 * circleSize;
            break;
        case 8:
            topHomeDistanceFromCenter = 3.6 * circleSize;
            rightHomeDistanceFromCenter = 2.7 * circleSize;
            break;
        case 9:
            topHomeDistanceFromCenter = 4 * circleSize;
            rightHomeDistanceFromCenter = 2.7 * circleSize;
            break;
        default:
            topHomeDistanceFromCenter = 5.1 * circleSize;
            rightHomeDistanceFromCenter = 0.5 * circleSize;
            break;
    }

    return (
        <div className='container position-absolute' style={{
            width: `${circleSize * 3}rem`,
            height: `${circleSize * 6}rem`,
            transform: `rotate(${degree}deg)`,
            transformOrigin: `50% -${distanceFromCenter}rem`,
        }}>
            <div className='row'>
                {stepLine2}
                <div className='col'>
                    <GoalLine movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} degree={degree} armNumber={armNumber} size={circleSize} />
                </div>
                <div className='col' style={{
                    transform: 'rotate(180deg)',
                    transformOrigin: `${circleSize / 2}rem ${2 * circleSize}rem`,
                }}>
                    <Line3 movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} degree={180 + degree} size={circleSize} armNumber={armNumber} playerCount={playerCount} />
                </div>
            </div>
            <div className='row'>
                <div className='col position-relative' style={{
                    transform: 'rotate(270deg)',
                    transformOrigin: '0',
                    top: `${5 * circleSize}rem`,
                }}>
                    <Line1 movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} degree={degree} size={circleSize} color={color} armNumber={armNumber} playerCount={playerCount} />
                </div>
            </div>

            <div className='position-relative' style={{
                top: `${topHomeDistanceFromCenter}rem`,
                right: `${rightHomeDistanceFromCenter}rem`,
            }}>
                <Home movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} game={game} currentUser={currentUser} color={color} degree={degree} size={circleSize} armNumber={armNumber} />
            </div>
        </div>
    );
}

export default BoardArm;