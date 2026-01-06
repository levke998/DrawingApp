'use client';

import React, { useState } from 'react';
import { Wand2, Loader2, X } from 'lucide-react';

interface AISidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (prompt: string) => void;
    isGenerating: boolean;
}

const AISidebar: React.FC<AISidebarProps> = ({ isOpen, onClose, onGenerate, isGenerating }) => {
    const [prompt, setPrompt] = useState('');

    if (!isOpen) return null;

    return (
        <div className="w-80 h-full bg-surface border-l border-gray-700 flex flex-col p-6 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-200">
                    <Wand2 className="text-accent" size={20} />
                    AI Generator
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Prompt</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what you want to draw..."
                        className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none text-slate-200"
                    />
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Tip:</strong> Be specific. Try "A futuristic city with flying cars" or "A cute geometric cat vector art".
                    </p>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
                <button
                    onClick={() => onGenerate(prompt)}
                    disabled={isGenerating || !prompt}
                    className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/25"
                >
                    {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                    {isGenerating ? 'Dreaming...' : 'Generate Image'}
                </button>
            </div>
        </div>
    );
};

export default AISidebar;
