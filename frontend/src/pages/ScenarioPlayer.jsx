/**
 * ============================================================================
 * ScenarioPlayer.jsx
 * ----------------------------------------------------------------------------
 * This page is responsible for running a cybersecurity scenario.
 *
 * Responsibilities:
 * - Receives the selected system and scenario from the previous page.
 * - Requests the scenario JSON from the backend.
 * - Initializes the scenario engine through useScenario().
 * - Displays the current scenario card.
 *
 * This is the main simulation screen where learners interact with scenarios.
 * ============================================================================
 */


import { useEffect, useState } from "react";

import Card from "../components/Card/Card";

import { fetchScenario } from "../api/scenarioApi";

import { useScenario } from "../hooks/useScenario";


/**
 * Loads and runs a selected cybersecurity scenario.
 *
 * @param {Object} props
 * @param {string} props.system - Category of scenario
 *                                (database, website, network)
 *
 * @param {string} props.scenarioId - Specific scenario identifier
 *                                    (misconfigured_firewalls, weak_passwords)
 */
export default function ScenarioPlayer({
    system,
    scenarioId
}) {


    /**
     * Stores the scenario JSON received from the backend.
     */
    const [scenario, setScenario] = useState(null);



    /**
     * Fetch the selected scenario when the page loads.
     */
    useEffect(() => {


        async function loadScenario() {


            const data = await fetchScenario(
                system,
                scenarioId
            );


            setScenario(data);

        }


        loadScenario();


    }, [system, scenarioId]);



    /**
     * Display loading state while waiting
     * for backend response.
     */
    if (!scenario) {

        return <h2>Loading scenario...</h2>;

    }



    return (

        <ScenarioContent
            scenario={scenario}
        />

    );

}





/**
 * Controls the execution of an already loaded scenario.
 *
 * Connects:
 *
 * JSON Scenario
 *       |
 *       ↓
 * useScenario Hook
 *       |
 *       ↓
 * Card Component
 *
 *
 * @param {Object} scenario - Loaded scenario JSON
 */
function ScenarioContent({
    scenario
}) {


    const {

        currentNode,

        next,

        back,

        stages

    } = useScenario(scenario);



    return (

        <Card

            node={currentNode}

            onNext={next}

            onBack={back}

            attackStages={stages}

        />

    );

}