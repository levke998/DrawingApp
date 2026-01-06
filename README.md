# AI Drawing App - Technical Documentation

## **Project Overview**
This is a Next.js web application that combines traditional raster graphics drawing (pencil, shapes) with AI-powered image generation (OpenAI DALL-E).

## **Architecture & Core Methods**

### **1. Entry Point: `app/page.tsx`**
This is the main page component. It acts as the "Controller" or "Orchestrator".
*   **Why we need it**: It holds the shared state (selected color, tool, brush size) that needs to be passed down to both the Toolbar (for control) and the Canvas (for drawing).
*   **Key State**:
    *   `tool`: Tracks current mode ('pencil', 'eraser', 'rectangle', 'circle').
    *   `color`: Hex string for brush color.
    *   `isGenerating`: Boolean flag to show loading spinners during AI requests.
*   **Key Methods**:
    *   `handleGenerate(prompt)`:
        1.  Sets `isGenerating` to true.
        2.  Sends a POST request to `/api/generate` with the user's text.
        3.  Receives a Base64 image string.
        4.  Creates a new JS `Image` object and draws it onto the canvas using `ctx.drawImage`.

### **2. The Drawing Engine: `components/Canvas.tsx`**
A React component wrapping the HTML5 `<canvas>` element.
*   **Why we need it**: To handle continuous mouse/touch input and render graphics pixel-by-pixel.
*   **Key Hooks**:
    *   `useEffect` (Canvas Setup): Runs when the component mounts. Sets the internal canvas resolution (`width`/`height`) and default styles (white background, round line caps).
    *   `useEffect` (Tool Update): Runs whenever `color` or `brushSize` changes to update the 2D Context properties (`ctx.strokeStyle`, `ctx.lineWidth`).
*   **Drawing Methods**:
    *   `startDrawing(e)`:
        *   Triggered on `mousedown` / `touchstart`.
        *   Calculates relative coordinates (X, Y) inside the canvas.
        *   **For Shapes**: Saves a "snapshot" of the current canvas (using `getImageData`) so we can show a live preview of the shape without permanently drawing it until release.
        *   **For Pencil**: simply starts a path (`ctx.beginPath`, `ctx.moveTo`).
    *   `draw(e)`:
        *   Triggered on movement. Returns immediately if `isDrawing` is false.
        *   **Pencil**: Continuously adds line segments (`ctx.lineTo`, `ctx.stroke`).
        *   **Shapes**:
            1.  Clears the current frame by restoring the "snapshot" (wipes the previous trail of the dragging shape).
            2.  Calculates width/radius based on start vs. current position.
            3.  Draws the shape path (`ctx.rect` or `ctx.arc`) and strokes it.
    *   `stopDrawing()`: Resets `isDrawing` to false and finalize the path.
    *   `getCoordinates(e)`: Helper to convert global mouse positions to canvas-relative coordinates.

### **3. The Controls: `components/Toolbar.tsx`** (To be split in Redesign)
Displays buttons for interactions.
*   **Why we need it**: To verify user intent (e.g., "I want to draw blue circles" or "I want to generate a cat").
*   **Logic**: It's a "dump" component—it receives functions like `setTool` or `onGenerate` from `page.tsx` and calls them when buttons are clicked.

### **4. AI Backend: `app/api/generate/route.ts`**
A Next.js Server Route.
*   **Why we need it**: We cannot call OpenAI directly from the browser because it would expose your secret API Key to the public. This server endpoint acts as a secure proxy.
*   **Workflow**:
    1.  Receives JSON `{ prompt: "..." }`.
    2.  Authenticates with OpenAI using `process.env.OPENAI_API_KEY`.
    3.  Calls `openai.images.generate` specifying `dall-e-3`.
    4.  Returns the image as a Base64 string (JSON).

## **Upcoming Architecture Changes (UI Redesign)**
*   **New Layout**: We are moving from a centered card layout to a full-screen application.
*   **Top Bar**: Will contain drawing tools (Pencil, Shapes, Eraser) and settings (Color, Size).
*   **Collapsible Sidebar**: Will house the AI generation interface to maximize drawing space when not in use.
*   **Responsive Canvas**: The canvas will resize to fill the viewport.

