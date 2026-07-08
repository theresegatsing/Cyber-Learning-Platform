/**
 * ============================================================================
 * useScenario.js
 * ----------------------------------------------------------------------------
 * Custom React hook responsible for controlling the execution of a
 * cybersecurity scenario.
 *
 * Responsibilities:
 *
 * - Creates and manages the scenario engine.
 * - Keeps track of the current scenario card.
 * - Moves forward and backward through the attack simulation.
 * - Stores the learner's attack path.
 * - Exposes scenario information to UI components.
 *
 * The hook acts as the connection layer between:
 *
 * Scenario JSON
 *      |
 *      ↓
 * Scenario Engine
 *      |
 *      ↓
 * React Components (Card, Sidebar, ProgressBar, AttackReplay)
 *
 * ============================================================================
 */


import { useState, useRef, useEffect } from "react";

import { createScenarioEngine } from "../engine/scenarioEngine";



/**
 * Controls the execution of one cybersecurity scenario.
 *
 * @param {Object} scenarioData
 * Complete scenario JSON loaded from the backend.
 *
 * Example:
 *
 * {
 *    id: "misconfigured_firewalls",
 *    system: "database",
 *    nodes: [...]
 * }
 *
 *
 * @returns {Object}
 *
 * currentNode
 *      The card currently displayed.
 *
 * next()
 *      Moves the learner forward.
 *
 * back()
 *      Returns to the previous card.
 *
 * canGoBack()
 *      Checks whether backward navigation is possible.
 *
 * stages
 *      Complete attack pipeline.
 *
 * currentStage
 *      Current step in the attack pipeline.
 *
 * history
 *      Nodes already visited by the learner.
 *
 * prevention
 *      Security recommendations.
 */
export function useScenario(scenarioData) {


    /**
     * Stores the scenario engine instance.
     *
     * useRef is used because the engine contains internal state
     * that should persist between React renders.
     */
    const engine = useRef(
        createScenarioEngine(scenarioData)
    );



    /**
     * When a new scenario is selected,
     * create a completely new engine.
     *
     * Example:
     *
     * Database Scenario
     *        |
     *        ↓
     * Return Home
     *        |
     *        ↓
     * Network Scenario
     *
     * The second scenario should not reuse
     * the first scenario's history.
     */
    useEffect(() => {


        engine.current =
            createScenarioEngine(scenarioData);



        setCurrentNode(

            engine.current.getCurrentNode()

        );



        setHistory([]);



    }, [scenarioData]);




    /**
     * Stores the card currently displayed.
     *
     * Initially, this is the node defined
     * by scenarioData.start.
     */
    const [currentNode, setCurrentNode] =
        useState(

            engine.current.getCurrentNode()

        );



    /**
     * Stores the learner's path through
     * the attack simulation.
     *
     * Used later for:
     *
     * - Attack Replay
     * - Learning analytics
     * - Training reports
     */
    const [history, setHistory] =
        useState([]);




    /**
     * Move the learner forward.
     *
     * Example:
     *
     * intro
     *   |
     *   ↓
     * weakness
     *
     *
     * @param {string} nextId
     * ID of the next scenario node.
     */
    function next(nextId) {


        engine.current.goNext(nextId);



        setCurrentNode(

            engine.current.getCurrentNode()

        );



        setHistory(

            [
                ...engine.current.getHistory()
            ]

        );

    }





    /**
     * Move the learner back to the previous node.
     *
     * The engine stores the previous path,
     * so the hook only requests the new location
     * and updates React state.
     */
    function back() {


        engine.current.goBack();



        setCurrentNode(

            engine.current.getCurrentNode()

        );



        setHistory(

            [
                ...engine.current.getHistory()
            ]

        );

    }





    /**
     * Determines whether the Back button
     * should move inside the scenario.
     *
     * If false:
     * - The learner is at the first card.
     * - The UI can return to system selection.
     *
     * @returns {boolean}
     */
    function canGoBack() {


        return (

            engine.current.getHistory().length > 0

        );

    }





    /**
     * Values exposed to React components.
     */
    return {


        /**
         * Current scenario card.
         */
        currentNode,



        /**
         * Move forward.
         */
        next,



        /**
         * Move backward.
         */
        back,



        /**
         * Check backward navigation.
         */
        canGoBack,



        /**
         * Complete attack pipeline.
         *
         * Example:
         *
         * Network Exposure
         * Service Discovery
         * Unauthorized Access
         */
        stages:

            engine.current.getStages(),



        /**
         * Current attack stage.
         */
        currentStage:

            engine.current.getCurrentStage(),



        /**
         * Learner's path through the attack.
         */
        history,



        /**
         * Security recommendations.
         */
        prevention:

            engine.current.getPreventionPoints()

    };

}