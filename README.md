# AI Drawing App

A Next.js-based drawing application that allows you to draw freely or use AI to generate drawings based on text prompts.

## Features
- **Freehand Drawing**: Pencil and Eraser tools.
- **Customization**: Adjustable brush color and size.
- **AI Generation**: Type a prompt (e.g., "cat") to generate a drawing using OpenAI's DALL-E model.
- **Responsive Design**: Works on desktop and touch devices.

## Prerequisites
Before running this project, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Git**

## Setup & Installation

Since the project files were generated manually, you need to initialize the environment:

1.  **Navigate to the project directory**:
    ```bash
    cd DrawingApp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    The `.env.local` file has been already created with your OpenAI API key. Ensure it is present in the root directory.

## Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
- **Draw**: Select the pencil tool and draw on the canvas.
- **AI**: In the sidebar, type a prompt (e.g., "cat") and click "Generate". The AI-generated image will appear on the canvas.
- **Clear**: Click the trash icon to clear the canvas.

## Tech Stack
- Next.js 14
- React 18
- Tailwind CSS
- OpenAI API
