# 💖 Valentine's Edition: Queen Game & Compliment Generator

**Version**: 1.0.0
**Author**: User / Replit / AI Assistant
**License**: MIT

---

## 📖 Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Technology Stack](#technology-stack)
    *   [Frontend](#frontend)
    *   [Backend](#backend)
    *   [Styling & Animation](#styling--animation)
4.  [Project Structure](#project-structure)
5.  [Installation & Setup](#installation--setup)
6.  [Running the Application](#running-the-application)
7.  [Architecture & Design](#architecture--design)
    *   [Server Architecture](#server-architecture)
    *   [Client Architecture](#client-architecture)
    *   [Data Storage](#data-storage)
8.  [Component Documentation](#component-documentation)
    *   [Home Page (`Home.jsx`)](#home-page)
    *   [Queen Game (`QueenGame.jsx`)](#queen-game)
    *   [Compliment Card (`ComplimentCard.jsx`)](#compliment-card)
    *   [Audio Player (`AudioPlayer.jsx`)](#audio-player)
    *   [Shared UI Components](#shared-ui-components)
9.  [Hooks & Utilities](#hooks--utilities)
10. [API Documentation](#api-documentation)
11. [Configuration Details](#configuration-details)
    *   [Tailwind CSS](#tailwind-css)
    *   [Vite](#vite)
12. [Future Improvements](#future-improvements)

---

## 1. Project Overview <a name="project-overview"></a>

**Valentine's Edition** is a specialized, interactive web application designed to celebrate self-love and empowerment. Created for a specific recipient ("The Queen"), it combines aesthetic visuals, interactive elements, and a mini-game to deliver a unique user experience.

The application serves multiple purposes:
-   **Entertainment**: Through the "Queen Energy Collector" game.
-   **Affirmation**: Via the "Compliment Generator" and secret messages.
-   **Atmosphere**: Using background music, particle effects, and animations.

It is built as a Single Page Application (SPA) served by an Express.js backend.

---

## 2. Features <a name="features"></a>

### 👑 Queen Energy Collector (Mini-Game)
A 60-second challenge where the player catches falling items with a basket.
-   **Items**:
    -   👑 **Crown** (+10 points): Represents royalty and power.
    -   💖 **Heart** (+5 points): Represents love.
    -   🍫 **Chocolate** (+3 points): Represents sweetness.
    -   🚩 **Red Flag** (-10 points): Obstacles to avoid.
-   **Timer**: A countdown timer limits the game session.
-   **Win Condition**: Score 100 points to trigger the "Slay Queen" victory screen.
-   **Loss Condition**: Running out of time or going below 0 points triggered the Game Over screen.

### 💌 Compliment Generator
An interactive card that cycles through a curated list of empowering compliments.
-   **Functionality**: Displays one compliment at a time.
-   **Copy Feature**: Users can copy the text to their clipboard with a single click.
-   **Animation**: Smooth transitions between compliments.

### 🎵 Ambience
-   **Background Music**: An integrated audio player that loops a soothing track ("Dreaming Big").
-   **Visuals**: Floating particle effects, glassmorphism UI design, and soft pastel color palettes.

### 🔒 Secret Message
A locked dialog box that reveals a heartfelt message when unlocked by the user.

---

## 3. Technology Stack <a name="technology-stack"></a>

### Frontend <a name="frontend"></a>
The client-side is built using modern React ecosystem tools:
-   **React 18**: Core library for building the user interface.
-   **Vite**: Next-generation frontend tooling for fast builds and HMR (Hot Module Replacement).
-   **Wouter**: A minimalist routing library for React, lighter than React Router.
-   **TanStack Query (React Query)**: For managing server state and API requests.

### Backend <a name="backend"></a>
The server-side provides API endpoints and serves the static frontend:
-   **Node.js**: Runtime environment.
-   **Express.js**: Fast, unopinionated web framework for Node.js.
-   **Zod**: TypeScript-first schema declaration and validation library (used for API input validation).

### Styling & Animation <a name="styling--animation"></a>
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **Framer Motion**: Production-ready animation library for React.
-   **Anime.js**: Lightweight JavaScript animation library (used for the typewriter effect).
-   **Lucide React**: Beautiful & consistent icon set.
-   **Radix UI**: Unstyled, accessible components for building high-quality design systems (Dialogs, Tooltips, etc.).

---

## 4. Project Structure <a name="project-structure"></a>

The project follows a monorepo-like structure where client and server coexist.

```
c:/MyStuff/Valentine/
├── client/                 # Frontend Source Code
│   ├── src/
│   │   ├── components/     # React Components
│   │   │   ├── game/       # Game-specific components
│   │   │   ├── ui/         # Reusable UI components (buttons, cards)
│   │   │   ├── AudioPlayer.jsx
│   │   │   └── ComplimentCard.jsx
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Application Pages (Home, NotFound)
│   │   ├── App.jsx         # Root Component & Routing
│   │   ├── main.jsx        # Entry Point
│   │   └── index.css       # Global Styles & Tailwind Directives
│   └── index.html          # HTML Template
├── server/                 # Backend Source Code
│   ├── index.js            # Server Entry Point
│   ├── routes.js           # API Route Definitions
│   ├── static.js           # Static File Serving Logic
│   └── storage.js          # In-Memory Data Storage
├── shared/                 # Code shared between Frontend and Backend
│   ├── routes.js           # Shared API Route Config
│   └── schema.js           # Shared Zod Schemas
├── package.json            # Project Dependencies & Scripts
├── tailwind.config.js      # Tailwind Configuration
└── vite.config.js          # Vite Configuration
```

---

## 5. Installation & Setup <a name="installation--setup"></a>

To set up this project locally, follow these steps:

### Prerequisites
-   **Node.js** (v18 or higher recommended)
-   **npm** (Node Package Manager)

### Steps
1.  **Clone or Download** the project to your local machine.
2.  **Navigate** to the project directory:
    ```bash
    cd c:/MyStuff/Valentine/
    ```
3.  **Install Dependencies**:
    This will install both frontend and backend dependencies defined in `package.json`.
    ```bash
    npm install
    ```

---

## 6. Running the Application <a name="running-the-application"></a>

### Development Mode
To run the application in development mode with hot-reloading:

```bash
npm run dev
```
-   This starts the Express server.
-   In development, the server sets up a Vite middleware to serve the frontend.
-   Open your browser (usually `http://localhost:5000`).

### Production Mode
To build and serve the production version:

1.  **Build** the project:
    ```bash
    npm run build
    ```
    This compiles the React app into `dist/public`.

2.  **Start** the server:
    ```bash
    npm start
    ```
    This runs the Node.js server which serves the static files from `dist/public`.

---

## 7. Architecture & Design <a name="architecture--design"></a>

### Server Architecture <a name="server-architecture"></a>
The backend is a standard Express application (`server/index.js`).
-   **Middleware**:
    -   JSON Parsing: `express.json()`
    -   Logging: Custom logging middleware tracks API request duration and responses.
    -   Error Handling: Global error handler captures exceptions and sends formatted JSON responses.
-   **Routing**: Routes are registered in `server/routes.js`.
-   **Static Serving**: In production, `server/static.js` handles serving the compiled frontend assets.

### Client Architecture <a name="client-architecture"></a>
The frontend operates as a Single Page Application.
-   **Entry Point**: `client/src/main.jsx` mounts the React application.
-   **Routing**: `App.jsx` handles client-side routing using `wouter`.
    -   `/`: Renders `Home.jsx`.
    -   (404): Renders `NotFound.jsx`.
-   **State Management**: `React Query` handles async server data. Local UI state is managed with `useState` and `useReducer`.

### Data Storage <a name="data-storage"></a>
The application currently uses an **In-Memory Storage** strategy (`server/storage.js`).
-   **Class `MemStorage`**:
    -   Stores scores in a simple JavaScript array `this.scores = []`.
    -   **Pros**: Fast, zero configuration, no external database required.
    -   **Cons**: Data is lost when the server restarts.
-   *Note*: The project previously supported a database connection but it was removed to simplify the deployment and reduce dependencies for this specific edition.

---

## 8. Component Documentation <a name="component-documentation"></a>

### Home Page (`Home.jsx`) <a name="home-page"></a>
The main landing page.
-   **Particles**: Uses standard DOM manipulation in `useEffect` to create floating div elements (`particles-container`).
-   **Typing Effect**: Uses `anime.js` to animate the headline "Happy Valentine's Day, Queen" word by word and letter by letter.
-   **Layout**: Displays the Hero section, Compliment Card, and Feature Grid (Game link and Secret Message).

### Queen Game (`QueenGame.jsx`) <a name="queen-game"></a>
Located in `client/src/components/game/QueenGame.jsx`.
-   **File**: `client/src/components/game/QueenGame.jsx`
-   **Logic**:
    -   **Game Loop**: Uses `requestAnimationFrame` for smooth rendering.
    -   **Spawning**: Objects spawn at a rate defined by `SPAWN_RATE` (800ms).
    -   **Movement**: Objects fall downwards by updating their `y` coordinate.
    -   **Collision**: Calculates intersection between the Basket's percentage coordinates and the falling objects.
-   **Controls**:
    -   Supports **Mouse** movement (`mousemove`).
    -   Supports **Touch** movement (`touchmove`) for mobile.
-   **Game States**:
    -   `gameOver`: Boolean, triggered by time running out.
    -   `gameWon`: Boolean, triggered by reaching 100 points.

### Compliment Card (`ComplimentCard.jsx`) <a name="compliment-card"></a>
Located in `client/src/components/ComplimentCard.jsx`.
-   **Data**: Contains a hardcoded array `COMPLIMENTS` with strings like "Your smile literally lights up the room...".
-   **Interaction**: Button click increments the `index` state modulo the array length.
-   **Animation**: `Framer Motion` animates the text opacity and position when changing.

### Audio Player (`AudioPlayer.jsx`) <a name="audio-player"></a>
Located in `client/src/components/AudioPlayer.jsx`.
-   **Audio Source**: Streams an MP3 file.
-   **Auto-Play**: Attempts to set volume and play on mount (though browsers often block auto-play without user interaction).
-   **UI**: Floating button with Play/Pause toggle.

### Shared UI Components <a name="shared-ui-components"></a>
Located in `client/src/components/ui`.
-   These are reusable components (likely generated by shadcn/ui) built on top of Radix UI primitives.
-   Examples: `Button`, `Card`, `Dialog`, `Toast`.
-   They provide accessibility and consistent styling using Tailwind classes.

---

## 9. Hooks & Utilities <a name="hooks--utilities"></a>

### `use-scores.js`
Custom hook for interacting with the score API.
-   `useScores()`: Fetches the leaderboard (GET `/api/scores`).
-   `useCreateScore()`: Submits a new score (POST `/api/scores`). Automatically invalidates the query cache on success to refresh the leaderboard.

### `use-toast.js`
A complex hook implementing a toast notification system.
-   Manages a queue of temporary notifications.
-   Uses a reducer pattern to handle `ADD_TOAST`, `UPDATE_TOAST`, and `DISMISS_TOAST` actions.

### `use-mobile.jsx`
A utility hook to detect screen size.
-   Uses `window.matchMedia` to listen for viewport changes.
-   Returns `true` if the width is less than the mobile breakpoint (768px).

### `queryClient.js`
Configures the TanStack Query client.
-   **`apiRequest`**: A wrapper around `fetch` that throws errors for non-200 responses and handles JSON stringification.
-   **Defaults**: Configures query behavior (no refetch on window focus, infinite stale time for static data).

---

## 10. API Documentation <a name="api-documentation"></a>

The application provides a RESTful API for score management.

### `GET /api/scores`
Retrieves the top high scores.
-   **Response**: JSON Array of score objects.
    ```json
    [
      { "id": 1, "playerName": "Queen", "score": 100, "createdAt": "..." },
      ...
    ]
    ```

### `POST /api/scores`
Submits a new game score.
-   **Body**:
    ```json
    {
      "playerName": "Queen",
      "score": 100
    }
    ```
-   **Validation**: Validated using Zod schema (`insertScoreSchema` in `shared/schema.js`).
-   **Response**: The created score object (201 Created) or an error message (400 Bad Request).

---

## 11. Configuration Details <a name="configuration-details"></a>

### Tailwind CSS <a name="tailwind-css"></a>
Configuration in `tailwind.config.js` and `client/src/index.css`.
-   **Theme Extension**:
    -   Custom Fonts: `Playfair Display` (Serif), `DM Sans` (Sans), `Dancing Script` (Cursive).
    -   Colors: Extended palette for "Pastel Luxury" (Soft Blush Pink, Lavender, Gold).
    -   Animations: Custom `float` keyframe animation defined in CSS.

### Vite <a name="vite"></a>
Configuration in `vite.config.js`.
-   **Plugins**: `@vitejs/plugin-react` for Fast Refresh.
-   **Aliases**: `@` maps to the `client/src` directory.
-   **Build Output**: `dist/public`.
-   **File System**: Strict file serving rules.

---

## 12. Future Improvements <a name="future-improvements"></a>

While the application is complete, potential future enhancements could include:
1.  **Persistent Database**: Re-integrate SQLite or PostgreSQL to save high scores permanently across server restarts.
2.  **Social Sharing**: Add buttons to share compliments or game scores on social media.
3.  **Custom Names**: Allow the player to input their name at the start of the game instead of defaulting to "Queen".
4.  **Difficulty Levels**: Speed up falling objects as time progresses or as score increases.
5.  **Offline Mode**: Utilize Service Workers to make the app fully installable (PWA) and functional offline.

---

*Made with love (and code) 💖*
