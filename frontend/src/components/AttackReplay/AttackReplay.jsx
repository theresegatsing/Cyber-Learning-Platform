/**
 * ============================================================================
 * AttackReplay.jsx
 * ----------------------------------------------------------------------------
 *
 * Displays the complete attack timeline and integrates prevention measures
 * directly into each attack stage.
 *
 *
 * Data sources:
 *
 * attack_stages:
 *
 * [
 *   {
 *      id:"network_exposure",
 *      title:"Network Exposure"
 *   }
 * ]
 *
 *
 * prevention_points:
 *
 * [
 *   {
 *      stage:"network_exposure",
 *      title:"Default-Deny Firewall Policy"
 *   }
 * ]
 *
 *
 * The component matches prevention points with their corresponding
 * attack stage using the stage ID.
 *
 * ============================================================================
 */


import "./AttackReplay.css";

import PreventionBlock from "../PreventionBlock/PreventionBlock";





export default function AttackReplay({

    stages,

    prevention

}) {



    /**
     * Safety check.
     */
    if(
        !stages ||
        stages.length === 0
    ){

        return null;

    }







    return (

        <div className="attack-replay">


            <h2>
                Attack Replay
            </h2>



            <p>
                Review how the attacker progressed through the system
                and where security controls could have interrupted the attack.
            </p>





            <div className="timeline">



                {
                    stages.map(

                        (stage,index)=>(



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






                                    {
                                        /*
                                         Find prevention controls
                                         belonging to this stage.
                                        */
                                    }



                                    <PreventionBlock

                                        stageId={stage.id}

                                        preventionPoints={prevention}

                                    />



                                </div>







                                {
                                    index !== stages.length - 1 &&


                                    <div className="arrow">

                                        ↓

                                    </div>

                                }





                            </div>


                        )

                    )

                }



            </div>



        </div>

    );


}