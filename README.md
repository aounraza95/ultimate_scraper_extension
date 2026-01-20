# Ultimate Scraper

**Turn any website into a clean API or CSV. No code required.**

Ultimate Scraper is a powerful Chrome Extension designed to make web scraping accessible, robust, and "infinite". It handles complex dynamic websites, virtual scrolling, and structural changes with ease, all from a modern React-based Side Panel identity.

![Ultimate Scraper Hero](landing-page/public/hero-preview.png)

## Features

*   **🪄 Magic Selector Engine**: Smart element selection that understands DOM structure, not just CSS classes. Includes drill-down support and similarity detection.
*   **🔄 Infinite Scroll Automation**: Automatically handles scroll events and saves data "on-the-fly" to support virtual lists (where items disappear from the DOM).
*   **⏭️ Auto-Pagination**: Detects and clicks "Next" buttons to traverse multiple pages automatically.
*   **📊 Data Desk**: Built-in data management to review, clean, and organize your scraped rows before exporting.
*   **💾 Recipes**: Save your scraper configurations for specific domains to run them again later with one click.
*   **📤 Universal Export**: Export your data to CSV, JSON, or Excel (XLSX).

## Tech Stack

### Chrome Extension (Root)
*   **Frontend**: React 18, TypeScript, Vite
*   **Build Tool**: CRXJS Vite Plugin (Manifest V3)
*   **State Management**: Zustand (persists data across side panel views)
*   **UI/Icons**: Lucide React
*   **Sheet Processing**: SheetJS (xlsx)

### Landing Page (`/landing-page`)
*   **Framework**: React 18, Vite
*   **Styling**: Tailwind CSS (Utility-first)
*   **Animations**: Framer Motion
*   **Design Theme**: "Notchie-Inspired" Light Mode (Clean, Bold Typography, Soft Shadows)

## Project Structure

```bash
ultimate_scraper/
├── src/                  # Chrome Extension Source
│   ├── components/       # Reusable UI components
│   ├── pages/            # Side Panel screens (Welcome, Session, DataDesk)
│   ├── content/          # Content Scripts (Highlighter, Scraper Logic)
│   ├── store/            # Zustand state stores
│   └── utils/            # Helpers (Recipe Manager, Export Logic)
├── landing-page/         # Marketing Website (Monorepo-style)
│   ├── src/             
│   └── public/
├── manifest.json         # Extension Manifest V3
└── vite.config.ts        # Vite Configuration
```

## Getting Started

### 1. Chrome Extension
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Build**:
    ```bash
    npm run build
    ```
3.  **Load in Chrome**:
    *   Open `chrome://extensions/`
    *   Enable "Developer mode"
    *   Click "Load unpacked"
    *   Select the `dist` folder generated in the root directory.

### 2. Marketing Website
1.  **Navigate to directory**:
    ```bash
    cd landing-page
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Development Workflow

*   **Extension**: The Vite dev server (`npm run dev`) will HMR the Side Panel. Content scripts may require a reload of the target webpage.
*   **Landing Page**: Standard Vite HMR.

## License

MIT
