export function createScenarioEngine(scenarioData) {

    let currentNodeId = scenarioData.start;

    let history = [];


    function getCurrentNode() {

        const node = scenarioData.nodes.find(
            node => node.id === currentNodeId
        );


        return node;

    }



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



    function getCurrentStage(){


        const node = getCurrentNode();


        return node?.stage;

    }



    function getStages(){

        return scenarioData.attack_stages;

    }



    function getHistory(){

        return history;

    }



    function getPreventionPoints(){

        return scenarioData.prevention_points;

    }



    return {

        getCurrentNode,
        goNext,
        getCurrentStage,
        getStages,
        getHistory,
        getPreventionPoints

    };

}