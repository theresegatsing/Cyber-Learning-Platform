export function createScenarioEngine(scenarioData) {

    let currentNodeId = scenarioData.start;


    function getCurrentNode() {

        return scenarioData.nodes.find(
            node => node.id === currentNodeId
        );

    }


    function goNext(nextNodeId) {

        currentNodeId = nextNodeId;

    }


    return {
        getCurrentNode,
        goNext
    };
}