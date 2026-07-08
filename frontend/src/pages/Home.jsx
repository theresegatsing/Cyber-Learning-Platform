/**
 * ============================================================================
 * Home.jsx
 * ----------------------------------------------------------------------------
 * Landing page where learners select a cybersecurity system and scenario.
 *
 * Home does NOT run scenarios.
 *
 * It only sends the learner selection back to App.jsx.
 *
 * Flow:
 *
 * Home
 *   |
 *   | onStart(system, scenario)
 *   ↓
 * App
 *   |
 *   ↓
 * ScenarioPlayer
 *
 * ============================================================================
 */


import { useState } from "react";


export default function Home({
    onStart
}) {


    const [system,setSystem] =
        useState(null);



    function startScenario(id){

        onStart(
            system,
            id
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
                onClick={() =>
                    setSystem("database")
                }
            >
                Database
            </button>



            <button
                onClick={() =>
                    setSystem("website")
                }
            >
                Website
            </button>



            <button
                onClick={() =>
                    setSystem("network")
                }
            >
                Network
            </button>




            {
                system === "database" && (

                    <div>

                        <h2>
                            Choose Scenario
                        </h2>


                        <button
                            onClick={() =>
                                startScenario(
                                    "misconfigured_firewalls"
                                )
                            }
                        >
                            Misconfigured Firewalls
                        </button>


                    </div>

                )
            }



        </div>

    );

}