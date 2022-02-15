import BoardArm from "./BoardArm";
import FinishStepCircle from "./FinishStepCircle";

const Board = ({ playerCount, circleSize, players, setSelectedPiece, selectedPiece, moveIndicator, setMoveIndicator, movePiece }) => {

    let distanceFromCenter;
    let v = (Math.PI / 180) * (360 / playerCount); // vinkeln mellan varje arm i radianer
    let d = circleSize;

    if (playerCount <= 4) {
        distanceFromCenter = (circleSize / 2);
    } else {
        distanceFromCenter = (d * (Math.cos(v / 2) + 1 / 2) / Math.sin(v / 2)) - (1.5 * d);
    }

    let rotDeg = 360 / playerCount;
    let render = [];
    let n = playerCount;

    for (let i = 0; i < playerCount; i++) {
        let h = i / n;
        let s = 1;
        let v = 1;

        let rgb = HSVtoRGB(h, s, v);
        let rgbString = `rgb(${rgb.r},${rgb.g},${rgb.b})`;

        render.push(<BoardArm key={i} distanceFromCenter={distanceFromCenter} movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} color={rgbString} degree={i * rotDeg} circleSize={circleSize} playerCount={playerCount} armNumber={i + 1} />);
        
    }

    render.push(<FinishStepCircle key={-1} distanceFromCenter={distanceFromCenter} movePiece={movePiece} moveIndicator={moveIndicator} setMoveIndicator={setMoveIndicator} selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} players={players} size={circleSize} />);

    return (
        <div>
            {render}
        </div>
    );

    function HSVtoRGB(h, s, v) {
        let r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s;
            v = h.v;
            h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

}

export default Board;