/**
 * ============================================================================
 * App.jsx
 * ----------------------------------------------------------------------------
 * Main entry component of the React application.
 *
 * Responsibilities:
 * - Defines the first page displayed when the application starts.
 * - Acts as the connection point between different pages.
 *
 * Later:
 * - React Router will be added here.
 * - Routes will connect Home, ScenarioPlayer, and future pages.
 * ============================================================================
 */


import Home from "./pages/Home";


/**
 * Root component of the application.
 */
export default function App(){


    return (

        <Home />

    );


}