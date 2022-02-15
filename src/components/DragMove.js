import React, { useState, useEffect } from "react";

const DragMove = (props) => {
    const {
        onPointerDown,
        onPointerUp,
        onPointerMove,
        onDragMove,
        children,
        style,
        className,
    } = props;

    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (e) => {
        setIsDragging(true);

        onPointerDown(e);
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);

        onPointerUp(e);
    };

    const handlePointerMove = (e) => {
        if (isDragging) onDragMove(e);

        onPointerMove(e);
    };

    useEffect(() => {
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointerup', handlePointerUp);
        }
    }, []);

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            style={style}
            className={className}
        >
            {children}
        </div>
    );
}

export default DragMove;

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};