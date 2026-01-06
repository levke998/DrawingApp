# 🗺️ Project Roadmap

This document outlines the future development plan for **Magic Draw**.

## 🟢 Phase 1: Foundation (Completed)
- [x] **Project Setup**: Next.js 14, TypeScript, TailwindCSS.
- [x] **Basic Drawing**: Pencil, Eraser, Color Picker, Brush Size.
- [x] **Shape Tools**: Rectangle, Circle.
- [x] **AI Integration**: DALL-E 3 Image Generation.
- [x] **UI Redesign**: Full-screen layout with Sidebar.
- [x] **Dev Workflow**: Automation scripts (`run_app.bat`, `save_progress.bat`).

## 🟡 Phase 2: Enhanced Functionality (Next Steps)
- [ ] **Undo/Redo**: Critical for user experience.
    - *Technical*: Implement a history stack (array of ImageData) in `Canvas.tsx`.
- [ ] **Image Download**: Allow users to save their masterpiece.
    - *Technical*: Conversion of Canvas to Blob/DataURL and trigger browser download.
- [ ] **Mobile Touch Polish**: Improve touch gesture support (prevent scrolling while drawing).

## 🔵 Phase 3: Advanced Features
- [ ] **Layers System**: Allow drawing on multiple layers (background, sketch, ink).
- [ ] **AI Inpainting**: "Edit part of the image with AI".
- [ ] **Collaborative Drawing**: Multiplayer support (WebSockets).
- [ ] **Custom Brushes**: Different textures/opacities.

## 🟣 Phase 4: Production
- [ ] **Authentication**: User accounts to save drawings to cloud.
- [ ] **Gallery**: View community drawings.
- [ ] **Deployment**: Vercel/Netlify setup.
