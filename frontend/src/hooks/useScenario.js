import {useState,useRef} from "react";
import {createScenarioEngine} from "../engine/scenarioEngine";


export function useScenario(scenarioData){


    const engine = useRef(
        createScenarioEngine(scenarioData)
    );


    const [currentNode,setCurrentNode] =
        useState(
            engine.current.getCurrentNode()
        );


    const [history,setHistory] =
        useState([]);



    function next(nextId){


        engine.current.goNext(nextId);


        setCurrentNode(
            engine.current.getCurrentNode()
        );


        setHistory(
            [...engine.current.getHistory()]
        );


    }



    return {

        currentNode,
        next,

        stages:
        engine.current.getStages(),

        currentStage:
        engine.current.getCurrentStage(),

        history,

        prevention:
        engine.current.getPreventionPoints()

    };

}