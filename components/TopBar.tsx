'use client';

import React from 'react';
import { Pencil, Eraser, Trash2, Square, Circle, Sparkles, Menu } from 'lucide-react';

interface TopBarProps {
    color: string;
    setColor: (color: string) => void;
    brushSize: number;
    setBrushSize: (size: number) => void;
    tool: 'pencil' | 'eraser' | 'rectangle' | 'circle';
    setTool: (tool: 'pencil' | 'eraser' | 'rectangle' | 'circle') => void;
    onClear: () => void;
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
    color, setColor, brushSize, setBrushSize, tool, setTool, onClear, toggleSidebar, isSidebarOpen
}) => {
    return (
        <div className="w-full h-16 bg-surface border-b border-gray-700 flex items-center justify-between px-4 shadow-md z-20">
            {/* Left: Brand & AI Toggle */}
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent hidden md:block">
                    Magic Draw
                </h1>
                <button
                    onClick={toggleSidebar}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isSidebarOpen ? 'bg-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    <Sparkles size={18} />
                    <span className="hidden sm:inline">AI Assistant</span>
                </button>
            </div>

            {/* Center: Tools */}
            <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                <button
                    onClick={() => setTool('pencil')}
                    className={`p-2 rounded-lg transition-all ${tool === 'pencil' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    title="Pencil"
                >
                    <Pencil size={20} />
                </button>
                <button
                    onClick={() => setTool('eraser')}
                    className={`p-2 rounded-lg transition-all ${tool === 'eraser' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    title="Eraser"
                >
                    <Eraser size={20} />
                </button>
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <button
                    onClick={() => setTool('rectangle')}
                    className={`p-2 rounded-lg transition-all ${tool === 'rectangle' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    title="Rectangle"
                >
                    <Square size={20} />
                </button>
                <button
                    onClick={() => setTool('circle')}
                    className={`p-2 rounded-lg transition-all ${tool === 'circle' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    title="Circle"
                >
                    <Circle size={20} />
                </button>
            </div>

            {/* Right: Settings */}
            <div className="flex items-center gap-4">
                {/* Color Picker */}
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none overflow-hidden"
                        title="Brush Color"
                    />
                </div>

                {/* Size Slider */}
                <div className="flex items-center gap-2 w-24 hidden sm:flex">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        title={`Size: ${brushSize}px`}
                    />
                    <div className="w-3 h-3 rounded-full bg-slate-500" />
                </div>

                <div className="w-px h-8 bg-gray-700 mx-2" />

                <button
                    onClick={onClear}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    title="Clear Canvas"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default TopBar;
