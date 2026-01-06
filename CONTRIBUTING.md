# Contributing to Magic Draw

Welcome to the development team! This document is designed to help both human developers and AI agents (like Antigravity) understand the project structure and workflows.

## 🤖 For AI Agents & Developers

### Core Principles
1.  **Simplicity**: We use standard Next.js 14 (App Router) features.
2.  **No "Magic"**: All UI components are explicitly defined in `/components`.
3.  **State Management**: `app/page.tsx` is the Single Source of Truth for the canvas state (tool, color, size).
4.  **Styling**: Use TailwindCSS utility classes. Do not create separate `.css` files unless absolutely necessary.

### Project Structure (File Map)
```
DrawingApp/
├── app/
│   ├── layout.tsx       # Root HTML/Body structure
│   ├── page.tsx         # Main Controller (State lives here!)
│   └── api/
│       └── generate/    # Backend route for OpenAI
├── components/
│   ├── Canvas.tsx       # The HTML5 drawing surface (Logic heavy)
│   ├── TopBar.tsx       # Tools, settings, colors (UI heavy)
│   └── AISidebar.tsx    # Prompt input and generation (UI heavy)
└── public/              # Static assets
```

### Component Guidelines

#### `Canvas.tsx`
- **Responsibility**: Rendering only.
- **Rules**:
    - DO NOT manage your own tool state individually.
    - LISTEN to `tool`, `color`, `brushSize` props from parent.
    - Triggers `onMouseDown`, `onMouseMove` internally but renders based on props.

#### `TopBar.tsx`
- **Responsibility**: User Input.
- **Rules**:
    - Pure UI component.
    - Calls `setTool`, `setColor` passed from parent.

#### `AISidebar.tsx`
- **Responsibility**: AI Interactions.
- **Rules**:
    - Manages its own `prompt` text state (local UI state).
    - Calls `onGenerate` prop when the user clicks the button.

## 🛠 Workflow

### 1. Running the Project
Always use the provided script to ensure consistent environment:
```bash
./run_app.bat
```

### 2. Saving Changes
**CRITICAL**: We utilize a custom script to handle Git operations, including lock-file cleanup and identity checks.
```bash
./save_progress.bat
```

### 3. Adding New Features
1.  **Plan**: Check `ROADMAP.md` for the next tasks.
2.  **Edit**: Modify the components.
3.  **Verify**: Run the app and test the feature.
4.  **Save**: Run `save_progress.bat`.

## ⚠️ Common Pitfalls to Avoid
- **Git Locks**: If git complains about `index.lock`, just run `save_progress.bat`, it handles it automatically.
- **Node Modules**: Never commit `node_modules`. The `.gitignore` handles this, but be careful not to force add them.
- **API Keys**: New environment variables must go in `.env.local` (which is ignored). Do not hardcode secrets!

Happy Coding! 🚀
