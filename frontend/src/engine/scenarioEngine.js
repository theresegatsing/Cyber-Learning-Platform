/**
 * ============================================================================
 * scenarioEngine.js
 * ----------------------------------------------------------------------------
 * The Scenario Engine is the core logic behind the cybersecurity learning
 * platform. It controls how a learner moves through a scenario by keeping
 * track of the current node, recording the learner's journey, and providing
 * information about the attack stages and prevention techniques.
 *
 * The engine does NOT render the user interface.
 * It simply manages the scenario's state and exposes methods that the React
 * components can use.
 * ============================================================================
 */

/**
 * Creates a new scenario engine from a scenario JSON file.
 *
 * Responsibilities:
 * - Keeps track of the current node.
 * - Moves between nodes.
 * - Records the learner's path through the scenario.
 * - Provides attack stages.
 * - Provides prevention recommendations.
 *
 * @param {Object} scenarioData - Complete scenario loaded from a JSON file.
 *
 * @returns {Object} Engine methods used by the frontend.
 */
export function createScenarioEngine(scenarioData) {

    /**
     * Stores the ID of the current node.
     *
     * Every scenario begins at the node specified by
     * scenarioData.start.
     */
    let currentNodeId = scenarioData.start;

    /**
     * Stores every node visited by the learner.
     *
     * This history will later be used to:
     * - visualize the attack path
     * - replay completed scenarios
     * - generate learning reports
     */
    let history = [];

    /**
     * Finds and returns the current node.
     *
     * The function searches the list of nodes inside the JSON
     * and returns the one whose ID matches currentNodeId.
     *
     * @returns {Object} Current scenario node.
     */
    function getCurrentNode() {

        const node = scenarioData.nodes.find(
            node => node.id === currentNodeId
        );

        return node;
    }

    /**
     * Moves the learner to another node.
     *
     * Before changing nodes, the current node is saved into
     * the history so the complete attack path can be reconstructed.
     *
     * @param {string} nextNodeId - ID of the next node.
     */
    function goNext(nextNodeId) {

        // Get the current node before leaving it.
        const currentNode = getCurrentNode();

        // Save the current node in the learner's history.
        if (currentNode) {

            history.push({

                nodeId: currentNode.id,
                title: currentNode.title,
                stage: currentNode.stage

            });

        }

        // Move to the next node.
        currentNodeId = nextNodeId;

    }

    /**
     * Moves the scenario back to the previous node.
     *
     * The engine stores visited nodes inside history.
     * The last visited node becomes the new current node.
     */
    function goBack(){


        if(history.length === 0){

            return;

        }



        const previousNode =
            history.pop();



        currentNodeId =
            previousNode.nodeId;


    }

    /**
     * Returns the attack stage of the current node.
     *
     * This information is used to update the progress bar
     * and highlight the learner's current position in the
     * attack lifecycle.
     *
     * @returns {string} Current attack stage.
     */
    function getCurrentStage() {

        const node = getCurrentNode();

        return node?.stage;

    }

    /**
     * Returns the complete attack pipeline for the scenario.
     *
     * Example:
     * Network Exposure
     * Service Discovery
     * Unauthorized Access
     * Database Compromise
     *
     * @returns {Array} List of attack stages.
     */
    function getStages() {

        return scenarioData.attack_stages;

    }

    /**
     * Returns every node already visited.
     *
     * This allows the application to build an attack replay,
     * visualize the learner's decisions, and generate reports.
     *
     * @returns {Array} Attack history.
     */
    function getHistory() {

        return history;

    }

    /**
     * Returns all prevention recommendations defined
     * for this scenario.
     *
     * These recommendations are shown near the end of
     * each scenario to teach learners how the attack
     * could have been prevented.
     *
     * @returns {Array} Prevention techniques.
     */
    function getPreventionPoints() {

        return scenarioData.prevention_points;

    }

    /**
     * Expose the engine's public methods.
     *
     * React components interact with the engine only through
     * these methods.
     */
    return {

        // Returns the current node.
        getCurrentNode,

        // Moves to another node.
        goNext,

        // Moves back to the previous node.
        goBack,

        // Returns the current attack stage.
        getCurrentStage,

        // Returns all attack stages.
        getStages,

        // Returns the learner's attack history.
        getHistory,

        // Returns prevention recommendations.
        getPreventionPoints

    };

}