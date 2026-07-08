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
 * - Handles navigation back to the Home page when the learner exits.
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
 *
 * @param {string} props.system
 * The selected cybersecurity system
 * (database, website, network).
 *
 * @param {string} props.scenarioId
 * The selected weakness/scenario.
 *
 * @param {Function} props.onExit
 * Function used to return to the Home page.
 */
export default function ScenarioPlayer({

    system,

    scenarioId,

    onExit

}) {

    /**
     * Stores the scenario JSON loaded
     * from the backend.
     */
    const [scenario, setScenario] = useState(null);


    /**
     * Fetch the selected scenario whenever
     * the selected system or scenario changes.
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
     * Display a loading message while waiting
     * for the backend response.
     */
    if (!scenario) {

        return <h2>Loading scenario...</h2>;

    }


    return (

        <ScenarioContent

            scenario={scenario}

            onExit={onExit}

        />

    );

}


/**
 * Executes an already loaded scenario.
 *
 * This component connects the scenario engine
 * to the user interface.
 *
 * It provides:
 * - current scenario node
 * - navigation functions
 * - attack replay data
 * - prevention data
 *
 * to the Card component.
 *
 * @param {Object} props
 * @param {Object} props.scenario
 * @param {Function} props.onExit
 */
function ScenarioContent({

    scenario,

    onExit

}) {

    /**
     * Initialize the custom scenario hook.
     */
    const {

        currentNode,

        next,

        back,

        canGoBack,

        stages,

        prevention

    } = useScenario(scenario);


    /**
     * Handles the Back button.
     *
     * If the learner has previously visited
     * another scenario node, move back one step.
     *
     * Otherwise, exit the scenario and return
     * to the Home page.
     */
    function handleBack() {

        if (canGoBack()) {

            back();

        }

        else {

            onExit();

        }

    }


    /**
     * Render the current scenario card.
     */
    return (

        <Card

            node={currentNode}

            onNext={next}

            onBack={handleBack}

            onExit={onExit}

            attackStages={stages}

            prevention={prevention}

        />

    );

}