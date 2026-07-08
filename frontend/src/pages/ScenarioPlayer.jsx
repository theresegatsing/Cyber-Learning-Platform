/**
 * ============================================================================
 * ScenarioPlayer.jsx
 * ----------------------------------------------------------------------------
 *
 * Main page responsible for executing a cybersecurity scenario.
 *
 * Responsibilities:
 *
 * - Receives the selected system and scenario ID.
 * - Fetches the scenario JSON from the backend.
 * - Initializes the scenario engine through useScenario().
 * - Controls navigation inside the scenario.
 * - Handles leaving the scenario and returning to system selection.
 *
 * Flow:
 *
 * Home.jsx
 *     |
 *     | user selects weakness
 *     ↓
 *
 * ScenarioPlayer.jsx
 *     |
 *     | loads JSON
 *     ↓
 *
 * useScenario()
 *     |
 *     ↓
 *
 * Card.jsx
 *
 * ============================================================================
 */


import {
    useEffect,
    useState
} from "react";


import Card from "../components/Card/Card";


import {
    fetchScenario
} from "../api/scenarioApi";


import {
    useScenario
} from "../hooks/useScenario";





/**
 * Loads and runs one cybersecurity scenario.
 *
 * @param {Object} props
 *
 * @param {string} system
 * Selected cybersecurity system.
 *
 * Example:
 * database
 *
 *
 * @param {string} scenarioId
 * Selected weakness.
 *
 * Example:
 * misconfigured_firewalls
 *
 *
 * @param {Function} onExit
 * Returns the learner to system selection.
 */
export default function ScenarioPlayer({

    system,

    scenarioId,

    onExit

}) {


    /**
     * Stores the scenario JSON.
     */
    const [
        scenario,
        setScenario
    ] = useState(null);






    /**
     * Fetch scenario from backend.
     */
    useEffect(() => {


        async function loadScenario(){


            const data = await fetchScenario(

                system,

                scenarioId

            );



            setScenario(data);


        }



        loadScenario();



    },[system,scenarioId]);






    /**
     * Loading state.
     */
    if(!scenario){


        return (

            <h2>
                Loading scenario...
            </h2>

        );

    }





    return (

        <ScenarioContent

            scenario={scenario}

            onExit={onExit}

        />

    );

}









/**
 * Runs the loaded scenario.
 *
 * This connects:
 *
 * JSON
 *  |
 *  ↓
 * Engine
 *  |
 *  ↓
 * UI
 *
 */
function ScenarioContent({

    scenario,

    onExit

}) {



    const {


        currentNode,


        next,


        back,


        canGoBack,


        stages,


        prevention



    } = useScenario(scenario);







    /**
     * Handles navigation backward.
     *
     * Two cases:
     *
     * Case 1:
     *
     * User is inside scenario:
     *
     * Attack step 3
     *       ↓
     * Attack step 2
     *
     *
     * Case 2:
     *
     * User is at first card:
     *
     * Scenario
     *       ↓
     * Systems
     *
     */
    function handleBack(){



        if(canGoBack()){


            back();


        }

        else{


            onExit();


        }


    }






    return (

        <Card


            node={currentNode}



            onNext={next}



            onBack={handleBack}



            onExit={onExit}



            attackStages={stages}



            prevention={prevention}



        />

    );

}