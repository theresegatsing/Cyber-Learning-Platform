/**
 * ============================================================================
 * AttackReplay.jsx
 * ----------------------------------------------------------------------------
 * Displays a visual timeline of how an attacker progressed through a scenario.
 *
 * The attack path is loaded dynamically from the scenario JSON:
 *
 * "attack_stages"
 *
 * Example:
 *
 * Firewall Exposure
 *        ↓
 * Service Discovery
 *        ↓
 * Unauthorized Access
 *        ↓
 * Database Compromise
 *
 * The component does not contain cybersecurity logic.
 * It only displays the attack path provided by the scenario engine.
 * ============================================================================
 */


import "./AttackReplay.css";



export default function AttackReplay({ stages }) {


    if (!stages || stages.length === 0) {

        return null;

    }



    return (

        <div className="attack-replay">


            

            <div className="timeline">


                {
                    stages.map((stage, index) => (


                        <div
                            key={stage.id}
                            className="timeline-item"
                        >


                            <div className="stage-number">

                                {index + 1}

                            </div>



                            <div className="stage-content">


                                <h3>

                                    {stage.title}

                                </h3>


                                <p>

                                    {stage.description}

                                </p>


                            </div>



                            {
                                index !== stages.length - 1 && (

                                    <div className="arrow">

                                        ↓

                                    </div>

                                )
                            }


                        </div>


                    ))
                }


            </div>


        </div>

    );

}