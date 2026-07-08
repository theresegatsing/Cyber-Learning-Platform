/**
 * ============================================================================
 * useScenario.js
 * ----------------------------------------------------------------------------
 *
 * React hook responsible for connecting the scenario engine with the UI.
 *
 * The hook acts as the bridge between:
 *
 * Scenario JSON
 *      |
 *      ↓
 * Scenario Engine
 *      |
 *      ↓
 * React Components
 *
 *
 * Responsibilities:
 *
 * - Initialize the scenario engine.
 * - Store the currently displayed node.
 * - Move forward through the scenario.
 * - Move backward through the scenario.
 * - Track learner history.
 * - Provide attack stages.
 * - Provide prevention recommendations.
 *
 * ============================================================================
 */


import { 
    useState,
    useRef,
    useEffect
} from "react";


import {
    createScenarioEngine
} from "../engine/scenarioEngine";





/**
 * Creates a controller for one cybersecurity scenario.
 *
 * @param {Object} scenarioData
 * Complete scenario JSON loaded from backend.
 */
export function useScenario(scenarioData) {



    /**
     * Scenario engine instance.
     *
     * useRef keeps the same engine object
     * between React renders.
     */
    const engine = useRef(
        createScenarioEngine(scenarioData)
    );





    /**
     * Current node displayed to the learner.
     */
    const [
        currentNode,
        setCurrentNode
    ] = useState(

        engine.current.getCurrentNode()

    );





    /**
     * Stores the learner's path.
     *
     * Used for:
     *
     * - Attack Replay
     * - Learning analytics
     * - Reports
     */
    const [
        history,
        setHistory
    ] = useState([]);






    /**
     * Reset the engine whenever
     * another scenario is selected.
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
     * The second scenario starts fresh.
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
     * Move forward to another node.
     *
     * @param {string} nextId
     * ID of next scenario node.
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
     * Move backward inside the scenario.
     *
     * Example:
     *
     * goal
     *  |
     *  ↓
     * attacker_goal
     *
     *
     * If the learner is already at the
     * first card, the UI will handle
     * returning to the Systems page.
     */
    function back() {



        if(
            !engine.current.canGoBack()
        ){

            return false;

        }



        engine.current.goBack();



        setCurrentNode(

            engine.current.getCurrentNode()

        );



        setHistory(

            [
                ...engine.current.getHistory()
            ]

        );



        return true;

    }







    /**
     * Determines whether the learner
     * can move backward inside the scenario.
     *
     * This is different from leaving
     * the scenario completely.
     *
     * @returns {boolean}
     */
    function canGoBack() {


        return (

            engine.current.canGoBack()

        );

    }






    /**
     * Determines whether the learner
     * is currently viewing the first card.
     *
     * Used by ScenarioPlayer:
     *
     * Back button on first card:
     *
     * Scenario → Systems
     *
     */
    function isFirstNode() {


        return (

            !engine.current.canGoBack()

        );

    }






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
         * Can move to previous scenario card.
         */
        canGoBack,



        /**
         * Currently at scenario beginning.
         */
        isFirstNode,



        /**
         * Complete attack pipeline.
         */
        stages:

            engine.current.getStages(),



        /**
         * Current attack stage.
         */
        currentStage:

            engine.current.getCurrentStage(),



        /**
         * Learner attack history.
         */
        history,



        /**
         * Prevention recommendations.
         */
        prevention:

            engine.current.getPreventionPoints()

    };

}