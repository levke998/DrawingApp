'use client';

import { useState, useRef, useEffect } from 'react';
import Canvas from '@/components/Canvas';
import Toolbar from '@/components/Toolbar';

export default function Home() {
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState<'pencil' | 'eraser' | 'rectangle' | 'circle'>('pencil');
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const handleGenerate = async (prompt: string) => {
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();

            if (data.image) {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            // Draw the image centered or fit
                            ctx.drawImage(img, 0, 0, 500, 500); // Fixed size for simplicity for now
                        }
                    }
                };
                img.src = `data:image/png;base64,${data.image}`;
            }
        } catch (e) {
            console.error(e);
            alert('Failed to generate image');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-background text-white">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-8">
                    Magic Draw
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl">
                <div className="bg-surface p-6 rounded-2xl shadow-xl w-full lg:w-64 border border-gray-700">
                    <Toolbar
                        color={color}
                        setColor={setColor}
                        brushSize={brushSize}
                        setBrushSize={setBrushSize}
                        tool={tool}
                        setTool={setTool}
                        onClear={clearCanvas}
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                    />
                </div>

                <div className="relative group bg-white rounded-lg overflow-hidden shadow-2xl ring-4 ring-offset-4 ring-offset-background ring-primary/50">
                    <Canvas
                        canvasRef={canvasRef}
                        color={color}
                        brushSize={brushSize}
                        tool={tool}
                        width={800}
                        height={600}
                    />
                </div>
            </div>
        </main>
    );
}
