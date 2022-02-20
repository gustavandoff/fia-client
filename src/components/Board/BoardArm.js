import Line1 from './Line1';
import Line2 from './Line2';
import Line3 from './Line3';
import GoalLine from './GoalLine';
import Home from './Home';

const BoardArm = ({ topHalfPlayerNumbers, distanceFromCenter, color, degree, circleSize, playerCount, armNumber, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePieceToPos }) => {

    const stepLine1 =
        <div className='row'>
            <div className='col position-relative' style={{
                transform: 'rotate(270deg)',
                transformOrigin: '0',
                top: `${5 * circleSize}rem`,
            }}>
                <Line1 key={1} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} degree={degree} size={circleSize} color={color} armNumber={armNumber} playerCount={playerCount} />
            </div>
        </div>

    let stepLine2;
    if (playerCount <= 4) {
        stepLine2 =
            <div className='col position-absolute' style={{
                bottom: 0,
            }}>
                <Line2 key={2} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} degree={degree} size={circleSize} length='4' armNumber={armNumber} />
            </div>
    } else {
        stepLine2 = (
            <div className='col position-absolute' style={{
                top: `${circleSize}rem`,
            }}>
                <Line2 key={2} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} degree={degree} size={circleSize} length='3' armNumber={armNumber} />
            </div>
        );
    }

    const goalLine =
        <div className='col position-absolute' style={{
            left: `${circleSize}rem`,
        }}>
            <GoalLine key={4} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} degree={degree} armNumber={armNumber} size={circleSize} />
        </div>

    const stepLine3 =
        <div className='col position-absolute' style={{
            left: `${2 * circleSize}rem`,
            transform: 'rotate(180deg)',
            transformOrigin: `${circleSize / 2}rem ${2 * circleSize}rem`,
        }}>
            <Line3 key={3} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} degree={180 + degree} size={circleSize} armNumber={armNumber} playerCount={playerCount} />
        </div>

    let render2G3 = [];
    let renderBottomLine = [];

    if (degree > 0 && degree < 180) {
        render2G3.push(stepLine3);
        render2G3.push(goalLine);
        render2G3.push(stepLine2);
    } else {
        render2G3.push(stepLine3);
        render2G3.push(goalLine);
        render2G3.push(stepLine2);
    }

    if (degree > 90 && degree < 270) {
        renderBottomLine.push(render2G3);
        renderBottomLine.push(stepLine2);
    } else {
        renderBottomLine.push(render2G3);
        renderBottomLine.push(stepLine2);
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
            pointerEvents: 'none',
        }}>
            <div className='row'>
                {render2G3}
            </div>
            {stepLine1}

            <div className='position-relative' style={{
                top: `${topHomeDistanceFromCenter}rem`,
                right: `${rightHomeDistanceFromCenter}rem`,
            }}>
                <Home key={5} movePieceToPos={movePieceToPos} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={color} degree={degree} size={circleSize} armNumber={armNumber} />
            </div>
        </div>
    );
}

export default BoardArm;