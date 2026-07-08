/**
 * ============================================================================
 * App.jsx
 * ----------------------------------------------------------------------------
 * Root component of the Cyber Learning Platform.
 *
 * Responsibilities:
 * - Acts as the entry point of the application's user interface.
 * - Displays the Home page when the application starts.
 * - Will later manage navigation between pages using React Router.
 *
 * Current Flow:
 *
 * App
 *  └── Home
 *        └── ScenarioPlayer
 *              └── Card
 * ============================================================================
 */

import Home from "./pages/Home";

/**
 * Root component.
 *
 * For now, simply display the Home page.
 * Later, this component will define application routes.
 */
export default function App() {

    return (

        <Home />

    );

}