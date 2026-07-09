/**
 * ============================================================================
 * Card.jsx
 * ----------------------------------------------------------------------------
 *
 * Displays one active scenario node.
 *
 * Card is responsible only for presentation.
 *
 * It does NOT:
 *
 * - Load JSON files
 * - Fetch backend data
 * - Control navigation logic
 *
 * It receives:
 *
 * - Current scenario node
 * - Navigation functions
 * - Attack replay data
 * - Prevention data
 *
 * ============================================================================
 */


import "./Card.css";


import {
    getImagePath
} from "../../utils/imageLoader";


import AttackReplay from "../AttackReplay/AttackReplay";





export default function Card({

    node,

    onNext,

    onBack,

    onExit,

    attackStages,

    prevention

}) {



    /**
     * Safety check.
     *
     * Prevents rendering
     * before scenario data exists.
     */
    if(!node){

        return null;

    }






    /**
     * Converts JSON image reference
     * into real frontend asset path.
     */
    // const imagePath =
    //    getImagePath(node.image);

    
    const imagePath = node.image
    ? (
        node.image.startsWith("icons/")
            ? `/src/assets/${node.image}`
            : `/src/assets/illustrations/${node.image}`
      )
    : null;

    console.log("JSON image:", node.image);
    console.log("Resolved image:", imagePath);






    return (

        <div className="card">







            {
                node.type !== "attack_replay" &&

                <>


                    <h2>

                        {node.title}

                    </h2>



                    <p>

                        {node.text}

                    </p>





                    {
                        imagePath &&


                        <img

                            src={imagePath}

                            alt={node.title}

                        />

                    }



                </>

            }









            {
                node.type === "choice" &&


                node.choices.map(

                    (choice,index)=>(


                        <button

                            key={index}

                            onClick={() =>
                                onNext(choice.next)
                            }

                        >

                            {choice.text}

                        </button>


                    )

                )

            }









            {
                node.type === "attack_replay" &&


                <AttackReplay

                    stages={attackStages}

                    prevention={prevention}

                />


            }









            {
                node.type !== "choice" &&

                node.type !== "attack_replay" &&

                node.next &&


                <button

                    onClick={() =>
                        onNext(node.next)
                    }

                >

                    Continue

                </button>


            }





            {
                node.type === "attack_replay" &&

                node.next &&


                <button

                    onClick={() =>
                        onNext(node.next)
                    }

                >

                    Continue

                </button>


            }








            {
                onBack &&


                <button

                    onClick={onBack}

                >

                    Back

                </button>


            }









            {
                node.type === "summary" &&


                <button

                    onClick={onExit}

                >

                    Return to Systems

                </button>


            }



        </div>


    );

}