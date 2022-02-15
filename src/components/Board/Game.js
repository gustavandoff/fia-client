import Board from "./Board";
import DragMove from '../DragMove';
import { useState } from 'react';

const Game = ({ circleSize, playerCount, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePiece }) => {
    const [boardPos, setBoardPos] = useState({ x: -60, y: 0 });
    const [boardSize, setBoardSize] = useState(1);

    const handleDragMove = (e) => {
        setBoardPos({
            x: boardPos.x + e.movementX,
            y: boardPos.y + e.movementY
        });
    };

    return (
        <div className="container position-absolute" style={{
            right: '25%',
            top: '12.5%',
            width: '50vw',
            height: '75h',
        }}>
            <div className="row">
                <div className="col" style={{
                    borderRight: 'black solid',
                    width: '100vw',
                    height: '75vh',
                }}>
                    <div className='position-absolute' style={{
                        top: '50%',
                        right: '50%',
                        transform: `scale(${boardSize})`,
                    }}>
                        <DragMove onDragMove={handleDragMove}>
                            <div style={{
                                transform: `translateX(${boardPos.x}px) translateY(${boardPos.y}px)`
                            }}>
                                <Board movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} playerCount={playerCount} circleSize={circleSize} players={players} />
                            </div>
                        </DragMove>
                    </div>

                </div>

                <div className="col position-absolute" style={{
                    width: '40px',
                    height: '100%',
                    right: '-12%',
                }}>
                    <label className="form-label" htmlFor="zoomInput">Zoom</label>
                    <input
                        type='range'
                        onChange={e => { setBoardSize(e.target.value) }}
                        defaultValue={1}
                        min={0.1}
                        max={5}
                        step={0.1}
                        className="form-range"
                        id="zoomInput"
                        orient="vertical"
                        style={{
                            writingMode: 'bt-lr',
                            WebkitAppearance: 'slider-vertical',
                            width: '8px',
                            height: '100%',
                            padding: '0 5px',
                        }}
                    />
                </div>
            </div>
        </div >
    );
}

export default Game;
