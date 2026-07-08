import { useState, useRef } from "react";
import { createScenarioEngine } from "../engine/scenarioEngine";

/**
 * Custom React hook that manages the execution of a cybersecurity scenario.
 *
 * Responsibilities:
 * - Creates a scenario engine for the selected JSON scenario.
 * - Keeps track of the current card (node) being displayed.
 * - Records the user's attack path (history).
 * - Exposes scenario information to the UI.
 *
 * @param {Object} scenarioData - Complete scenario loaded from a JSON file.
 *
 * @returns {Object} An object containing:
 *  - currentNode: Current card displayed to the user.
 *  - next(): Moves to the next node.
 *  - stages: Complete attack pipeline.
 *  - currentStage: Current attack stage.
 *  - history: Nodes already visited.
 *  - prevention: Prevention techniques for this scenario.
 */
export function useScenario(scenarioData) {

    /**
     * Creates ONE scenario engine instance.
     *
     * useRef() is used instead of useState() because the engine should
     * remain the same during re-renders. Only its internal state changes.
     */
    const engine = useRef(
        createScenarioEngine(scenarioData)
    );

    /**
     * Stores the node (card) currently displayed on the screen.
     *
     * Initially, this is the node whose id equals scenarioData.start.
     */
    const [currentNode, setCurrentNode] =
        useState(
            engine.current.getCurrentNode()
        );

    /**
     * Stores every node the learner has already visited.
     *
     * This will later be used to:
     * - build the attack replay
     * - visualize the attack path
     * - generate training reports
     */
    const [history, setHistory] =
        useState([]);

    /**
     * Advances the simulation to another node.
     *
     * Steps:
     * 1. Tell the engine to move to the next node.
     * 2. Update the current card displayed.
     * 3. Update the user's attack history.
     *
     * @param {string} nextId - ID of the next node.
     */
    function next(nextId) {

        // Move the engine to the next node.
        engine.current.goNext(nextId);

        // Display the new node.
        setCurrentNode(
            engine.current.getCurrentNode()
        );

        // Save the updated attack path.
        setHistory(
            [...engine.current.getHistory()]
        );
    }

    /**
     * Moves the learner back to the previous card.
     *
     * Calls the scenario engine because the engine
     * owns the current scenario position.
     */
    function back(){


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
     * Returns true if the learner can go back to a previous node.
    */
     
    function canGoBack(){

        return engine.current.getHistory().length > 0;

    }

    /**
     * Return everything the UI needs.
     *
     * Components such as Card, ProgressBar, Sidebar,
     * and Attack Replay will consume these values.
     */
    return {

        // Current card being displayed.
        currentNode,

        // Function used to move through the scenario.
        next,

        // Function used to move back to the previous node.
        back,

        // Returns true if the learner can go back to a previous node.
        canGoBack,

        // Complete list of attack stages.
        stages:
            engine.current.getStages(),

        // Current stage of the attack.
        currentStage:
            engine.current.getCurrentStage(),

        // User's completed attack path.
        history,

        // Prevention recommendations for the scenario.
        prevention:
            engine.current.getPreventionPoints()

    };

}