'use client';

import { useState, useRef, useEffect } from 'react';
import Canvas from '@/components/Canvas';
import TopBar from '@/components/TopBar';
import AISidebar from '@/components/AISidebar';

export default function Home() {
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState<'pencil' | 'eraser' | 'rectangle' | 'circle'>('pencil');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Resize canvas to fit container
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        // Initial size
        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [isSidebarOpen]); // Recalculate when sidebar toggles

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
                            // Draw the image centered
                            const x = (canvas.width - 500) / 2;
                            const y = (canvas.height - 500) / 2;
                            ctx.drawImage(img, x, y, 500, 500);
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
        <main className="flex h-screen flex-col bg-background text-white overflow-hidden">

            {/* Top Navigation Bar */}
            <TopBar
                color={color}
                setColor={setColor}
                brushSize={brushSize}
                setBrushSize={setBrushSize}
                tool={tool}
                setTool={setTool}
                onClear={clearCanvas}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isSidebarOpen={isSidebarOpen}
            />

            {/* Main Content Area */}
            <div className="flex flex-1 relative overflow-hidden">

                {/* Canvas Container */}
                <div ref={containerRef} className="flex-1 bg-gray-200 relative cursor-crosshair">
                    <div className="absolute inset-4 bg-white shadow-xl rounded-lg overflow-hidden">
                        <Canvas
                            canvasRef={canvasRef}
                            color={color}
                            brushSize={brushSize}
                            tool={tool}
                            width={dimensions.width - 32} // Subtract padding
                            height={dimensions.height - 32}
                        />
                    </div>
                </div>

                {/* AI Sidebar */}
                <AISidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                />

            </div>
        </main>
    );
}
