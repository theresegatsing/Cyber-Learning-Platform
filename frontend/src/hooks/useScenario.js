import { useState, useRef } from "react";
import { createScenarioEngine } from "../engine/scenarioEngine";


export function useScenario(scenarioData) {


    const engine = useRef(
        createScenarioEngine(scenarioData)
    );


    const [currentNode, setCurrentNode] = useState(
        engine.current.getCurrentNode()
    );


    function next(nextNodeId) {

        engine.current.goNext(nextNodeId);

        setCurrentNode(
            engine.current.getCurrentNode()
        );

    }


    return {
        currentNode,
        next
    };

}