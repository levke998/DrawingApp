'use client';

import React, { useEffect, useState } from 'react';

interface CanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    color: string;
    brushSize: number;
    tool: 'pencil' | 'eraser' | 'rectangle' | 'circle';
    width: number;
    height: number;
}

const Canvas: React.FC<CanvasProps> = ({ canvasRef, color, brushSize, tool, width, height }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
    const [snapshot, setSnapshot] = useState<ImageData | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
            }
        }
    }, [width, height, canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
                ctx.lineWidth = brushSize;
            }
        }
    }, [color, brushSize, tool, canvasRef]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsDrawing(true);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setStartPos({ x: offsetX, y: offsetY });
        setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { offsetX, offsetY } = getCoordinates(e, canvas);

        if (tool === 'pencil' || tool === 'eraser') {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        } else if (startPos && snapshot) {
            // Restore the snapshot to clear previous shape preview
            ctx.putImageData(snapshot, 0, 0);

            ctx.beginPath();
            if (tool === 'rectangle') {
                const width = offsetX - startPos.x;
                const height = offsetY - startPos.y;
                ctx.strokeRect(startPos.x, startPos.y, width, height);
            } else if (tool === 'circle') {
                const radius = Math.sqrt(Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2));
                ctx.beginPath();
                ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.closePath();
        }
        setStartPos(null);
        setSnapshot(null);
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        };
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair touch-none"
            style={{ width, height }}
        />
    );
};

export default Canvas;
