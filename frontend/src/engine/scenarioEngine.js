/**
 * ============================================================================
 * scenarioEngine.js
 * ----------------------------------------------------------------------------
 *
 * Core logic responsible for controlling a cybersecurity scenario.
 *
 * The engine:
 *
 * - Tracks the learner's current position.
 * - Moves forward through scenario nodes.
 * - Moves backward through visited nodes.
 * - Records the attack path.
 * - Provides attack stages.
 * - Provides prevention recommendations.
 *
 * The engine DOES NOT render UI.
 *
 * React components communicate with the engine through the methods returned
 * at the bottom of this file.
 *
 * ============================================================================
 */


export function createScenarioEngine(scenarioData) {


    /**
     * Current node displayed to the learner.
     */
    let currentNodeId = scenarioData.start;



    /**
     * Stores visited nodes.
     *
     * This represents the learner's path through the attack.
     *
     * Example:
     *
     * intro
     *  |
     * weakness
     *  |
     * attacker_goal
     */
    let history = [];




    /**
     * Finds the current node inside the scenario JSON.
     */
    function getCurrentNode() {


        return scenarioData.nodes.find(

            node => node.id === currentNodeId

        );

    }





    /**
     * Move forward in the scenario.
     *
     * Before leaving the current node,
     * store it in history.
     */
    function goNext(nextNodeId) {


        const currentNode = getCurrentNode();



        if(currentNode){


            history.push({

                nodeId: currentNode.id,

                title: currentNode.title,

                stage: currentNode.stage

            });


        }



        currentNodeId = nextNodeId;


    }






    /**
     * Move backward in the scenario.
     *
     * The last visited node becomes the current node.
     */
    function goBack(){


        if(history.length === 0){

            return false;

        }



        const previousNode =
            history.pop();



        currentNodeId =
            previousNode.nodeId;



        return true;


    }






    /**
     * Determines whether the learner can move backward.
     */
    function canGoBack(){


        return history.length > 0;


    }






    /**
     * Returns the current attack stage.
     */
    function getCurrentStage(){


        const node = getCurrentNode();


        return node?.stage;


    }






    /**
     * Returns attack pipeline.
     */
    function getStages(){


        return scenarioData.attack_stages || [];


    }






    /**
     * Returns visited nodes.
     *
     * Used for:
     *
     * - Attack replay
     * - Analytics
     * - Reports
     */
    function getHistory(){


        return history;


    }






    /**
     * Returns prevention techniques.
     */
    function getPreventionPoints(){


        return scenarioData.prevention_points || [];


    }





    return {


        getCurrentNode,


        goNext,


        goBack,


        canGoBack,


        getCurrentStage,


        getStages,


        getHistory,


        getPreventionPoints


    };


}