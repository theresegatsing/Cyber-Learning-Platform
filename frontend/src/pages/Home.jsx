/**
 * ============================================================================
 * Home.jsx
 * ----------------------------------------------------------------------------
 * Landing page of the cybersecurity learning platform.
 *
 * Responsibilities:
 * - Allows users to choose a cybersecurity system.
 * - Allows users to select a scenario.
 * - Starts the selected simulation.
 *
 * Future improvements:
 * - Add cards with illustrations.
 * - Add animations.
 * - Load available scenarios dynamically from backend.
 * ============================================================================
 */


import { useState } from "react";

import ScenarioPlayer from "./ScenarioPlayer";



export default function Home(){


    /**
     * Stores the selected system.
     */
    const [system, setSystem] = useState(null);



    /**
     * Stores the selected scenario.
     */
    const [scenarioId, setScenarioId] = useState(null);



    /**
     * Start the scenario.
     */
    if(system && scenarioId){


        return (

            <ScenarioPlayer

                system={system}

                scenarioId={scenarioId}

            />

        );

    }



    return (

        <div>


            <h1>
                Cyber Learning Platform
            </h1>


            <h2>
                Choose a System
            </h2>



            <button

                onClick={() => setSystem("database")}

            >

                Database

            </button>



            <button

                onClick={() => setSystem("website")}

            >

                Website

            </button>



            <button

                onClick={() => setSystem("network")}

            >

                Network

            </button>





            {
                system && (

                    <div>


                        <h2>
                            Choose Scenario
                        </h2>


                        {
                            system === "database" && (

                                <button

                                    onClick={() =>
                                        setScenarioId(
                                            "misconfigured_firewalls"
                                        )
                                    }

                                >

                                    Misconfigured Firewalls

                                </button>

                            )

                        }


                    </div>

                )
            }



        </div>

    );

}