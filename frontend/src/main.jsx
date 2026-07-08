/**
 * ============================================================================
 * main.jsx
 * ----------------------------------------------------------------------------
 * Entry point of the Cyber Learning Platform.
 *
 * Responsibilities:
 * - Creates the React application.
 * - Mounts the root App component into index.html.
 * - Imports global application styles.
 *
 * Application Startup Flow:
 *
 * Browser
 *    ↓
 * index.html
 *    ↓
 * main.jsx
 *    ↓
 * App.jsx
 *    ↓
 * Home.jsx
 * ============================================================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

/**
 * Render the root React component inside the HTML element
 * whose id is "root".
 */
createRoot(

    document.getElementById("root")

).render(

    <StrictMode>

        <App />

    </StrictMode>

);