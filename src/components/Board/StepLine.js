import StepCircle from "./StepCircle";

const StepLine = ({ degree, size, length, startLine, color }) => {

    let render = [];

    for (let i = 0; i < length; i++) {
        let curCol;
        if (startLine && i == 0) { // om linjen som ritas är en av kortsidorna där pjäserna startar och om cirkeln är starrutan
            curCol = color;
        } else {
            curCol = 'tan';
        }

        render.push(<StepCircle color={curCol} size={size} degree={degree} />);
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

export default StepLine;