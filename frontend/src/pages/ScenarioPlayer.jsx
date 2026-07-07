/**
 * ============================================================================
 * ScenarioPlayer.jsx
 * ----------------------------------------------------------------------------
 * This page is responsible for running a cybersecurity scenario.
 *
 * Responsibilities:
 * - Requests a scenario from the backend.
 * - Waits until the scenario is loaded.
 * - Initializes the scenario engine through the custom hook.
 * - Displays the current scenario card.
 *
 * This is the main screen where learners interact with the simulation.
 * ============================================================================
 */

import { useEffect, useState } from "react";

import Card from "../components/Card/Card";

import { fetchScenario } from "../api/scenarioApi";

import { useScenario } from "../hooks/useScenario";


/**
 * Main page responsible for loading a scenario.
 *
 * The scenario is retrieved from the backend when the page
 * is first opened.
 *
 * While the scenario is loading, a loading message is shown.
 * Once loaded, the ScenarioContent component takes over.
 */
export default function ScenarioPlayer() {

    /**
     * Stores the complete scenario loaded from the backend.
     *
     * Initially null because no data has been received yet.
     */
    const [scenario, setScenario] = useState(null);

    /**
     * Runs once when the component is mounted.
     *
     * It requests the selected scenario from the backend API.
     */
    useEffect(() => {

        /**
         * Fetches the scenario JSON from the backend.
         *
         * Current example:
         * System: Database
         * Scenario: Misconfigured Firewalls
         *
         * Later these values will come from the user's selection
         * on the Home page.
         */
        async function loadScenario() {

            const data = await fetchScenario(
                "database",
                "misconfigured_firewalls"
            );

            // Store the loaded scenario.
            setScenario(data);

        }

        loadScenario();

    }, []);

    /**
     * Display a loading message while waiting for
     * the backend to return the scenario.
     */
    if (!scenario) {

        return <h2>Loading scenario...</h2>;

    }

    /**
     * Once the scenario has been loaded,
     * pass it to the ScenarioContent component
     * to begin the simulation.
     */
    return <ScenarioContent scenario={scenario} />;

}


/**
 * Runs an already loaded scenario.
 *
 * This component connects the scenario engine to
 * the visual interface by providing the current node
 * and navigation functions to the Card component.
 *
 * @param {Object} scenario - Scenario JSON loaded from the backend.
 */
function ScenarioContent({ scenario }) {

    /**
     * Initializes the custom hook that controls
     * the scenario execution.
     */
    const {
        currentNode,
        next
    } = useScenario(scenario);

    /**
     * Display the current scenario card.
     *
     * The Card component is responsible only for
     * presenting the current node and notifying
     * the hook when the learner wants to continue.
     */
    return (

        <Card
            node={currentNode}
            onNext={next}
        />

    );

}