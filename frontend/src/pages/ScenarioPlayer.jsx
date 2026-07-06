import { useEffect, useState } from "react";

import Card from "../components/Card/Card";

import { fetchScenario } from "../api/scenarioApi";

import { useScenario } from "../hooks/useScenario";


export default function ScenarioPlayer(){


    const [scenario,setScenario] = useState(null);


    useEffect(()=>{

        async function loadScenario(){

            const data = await fetchScenario(
                "database",
                "misconfigured_firewalls"
            );

            setScenario(data);

        }


        loadScenario();

    },[]);



    if(!scenario){

        return <h2>Loading scenario...</h2>;

    }



    return <ScenarioContent scenario={scenario}/>;

}



function ScenarioContent({scenario}){


    const {
        currentNode,
        next
    } = useScenario(scenario);



    return (

        <Card
            node={currentNode}
            onNext={next}
        />

    );

}