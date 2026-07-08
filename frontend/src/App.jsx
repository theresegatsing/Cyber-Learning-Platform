/**
 * ============================================================================
 * App.jsx
 * ----------------------------------------------------------------------------
 *
 * Root component of the Cyber Learning Platform.
 *
 * Responsibilities:
 *
 * - Controls the main application flow.
 * - Displays system selection (Home).
 * - Stores the selected cybersecurity system.
 * - Stores the selected weakness/scenario.
 * - Opens the selected scenario.
 * - Returns the learner back to system selection.
 *
 *
 * Application flow:
 *
 *
 * App
 *  |
 *  |
 *  ├── Home
 *  |      |
 *  |      | user selects scenario
 *  |      ↓
 *  |
 *  └── ScenarioPlayer
 *          |
 *          ↓
 *       Card
 *
 *
 * ============================================================================
 */


import {
    useState
} from "react";


import Home from "./pages/Home";


import ScenarioPlayer from "./pages/ScenarioPlayer";





export default function App(){



    /**
     * Controls which main screen
     * is displayed.
     *
     * Possible values:
     *
     * home
     * scenario
     */
    const [
        page,
        setPage
    ] = useState("home");





    /**
     * Stores selected cybersecurity system.
     *
     * Example:
     *
     * database
     * website
     * network
     */
    const [
        system,
        setSystem
    ] = useState(null);





    /**
     * Stores selected weakness.
     *
     * Example:
     *
     * misconfigured_firewalls
     */
    const [
        scenarioId,
        setScenarioId
    ] = useState(null);








    /**
     * Called by Home.jsx
     *
     * Receives the learner's selection.
     */
    function startScenario(
        selectedSystem,
        selectedScenario
    ){


        setSystem(selectedSystem);


        setScenarioId(selectedScenario);


        setPage("scenario");


    }







    /**
     * Returns learner back
     * to the system selection page.
     *
     * Used by:
     *
     * ScenarioPlayer
     *      |
     *      ↓
     * Card Back button
     */
    function exitScenario(){


        setSystem(null);


        setScenarioId(null);


        setPage("home");


    }








    /**
     * Display Home page.
     */
    if(page==="home"){


        return (

            <Home

                onStart={startScenario}

            />

        );

    }






    /**
     * Display selected scenario.
     */
    return (

        <ScenarioPlayer


            system={system}



            scenarioId={scenarioId}



            onExit={exitScenario}



        />

    );

}