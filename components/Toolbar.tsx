'use client';

import React, { useState } from 'react';
import { Pencil, Eraser, Trash2, Wand2, Loader2, Download, Square, Circle } from 'lucide-react';

interface ToolbarProps {
    color: string;
    setColor: (color: string) => void;
    brushSize: number;
    setBrushSize: (size: number) => void;
    tool: 'pencil' | 'eraser' | 'rectangle' | 'circle';
    setTool: (tool: 'pencil' | 'eraser' | 'rectangle' | 'circle') => void;
    onClear: () => void;
    onGenerate: (prompt: string) => void;
    isGenerating: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
    color, setColor, brushSize, setBrushSize, tool, setTool, onClear, onGenerate, isGenerating
}) => {
    const [prompt, setPrompt] = useState('');

    const handleGenerateClick = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="flex flex-col gap-6 text-slate-300">
            <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tools</label>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTool('pencil')}
                        className={`p-3 rounded-lg transition-all ${tool === 'pencil' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-700 hover:bg-slate-600'}`}
                        title="Pencil"
                    >
                        <Pencil size={20} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-3 rounded-lg transition-all ${tool === 'eraser' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-700 hover:bg-slate-600'}`}
                        title="Eraser"
                    >
                        <Eraser size={20} />
                    </button>
                    <button
                        onClick={() => setTool('rectangle')}
                        className={`p-3 rounded-lg transition-all ${tool === 'rectangle' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-700 hover:bg-slate-600'}`}
                        title="Rectangle"
                    >
                        <Square size={20} />
                    </button>
                    <button
                        onClick={() => setTool('circle')}
                        className={`p-3 rounded-lg transition-all ${tool === 'circle' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-700 hover:bg-slate-600'}`}
                        title="Circle"
                    >
                        <Circle size={20} />
                    </button>
                    <button
                        onClick={onClear}
                        className="p-3 rounded-lg bg-slate-700 hover:bg-red-500 hover:text-white transition-all ml-auto"
                        title="Clear Canvas"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Brush Settings</label>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span>Color</span>
                        <span className="uppercase">{color}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['#000000', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'].map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-primary' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-8 h-8 rounded-full cursor-pointer bg-transparent"
                        />
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                        <span>Size</span>
                        <span>{brushSize}px</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            </div>

            <div className="border-t border-slate-700 pt-6 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Generation</label>
                <div className="space-y-2">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type 'cat' to draw a cat..."
                        className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                    />
                    <button
                        onClick={handleGenerateClick}
                        disabled={isGenerating || !prompt}
                        className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/25"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
