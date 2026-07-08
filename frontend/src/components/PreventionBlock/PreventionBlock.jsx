/**
 * ============================================================================
 * PreventionBlock.jsx
 * ----------------------------------------------------------------------------
 *
 * Displays security controls that could have prevented one specific stage
 * of an attack.
 *
 *
 * Example:
 *
 * Stage:
 * network_exposure
 *
 * Prevention:
 *
 * - Default-Deny Firewall Policy
 * - Regular Firewall Rule Reviews
 *
 *
 * The component receives:
 *
 * stageId
 *      Current attack stage.
 *
 * preventionPoints
 *      Complete prevention list from JSON.
 *
 * ============================================================================
 */


import "./PreventionBlock.css";





export default function PreventionBlock({

    stageId,

    preventionPoints

}) {



    /**
     * Find prevention controls
     * related to this attack stage.
     */
    const stagePreventions =

        preventionPoints?.filter(

            point => point.stage === stageId

        );






    /**
     * No prevention exists
     * for this stage.
     */
    if(

        !stagePreventions ||

        stagePreventions.length === 0

    ){

        return null;

    }







    return (

        <div className="prevention-block">


            <h4>

                Prevention Opportunity

            </h4>





            {

                stagePreventions.map(

                    (point,index)=>(


                        <div

                            key={index}

                            className="prevention-card"

                        >



                            <h5>

                                {point.title}

                            </h5>




                            <p>

                                {point.description}

                            </p>



                        </div>


                    )

                )

            }



        </div>


    );


}