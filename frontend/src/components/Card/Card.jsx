/**
 * ============================================================================
 * Card.jsx
 * ----------------------------------------------------------------------------
 * Displays one active scenario node.
 *
 * The Card component does not know about:
 * - JSON files
 * - backend requests
 * - scenario navigation logic
 *
 * It only receives:
 * - the current node
 * - functions to move forward/backward
 *
 * ============================================================================
 */


import "./Card.css";

import { getImagePath } from "../../utils/imageLoader";

import PreventionBlock from "../PreventionBlock/PreventionBlock";

import AttackReplay from "../AttackReplay/AttackReplay";



export default function Card({
    node,
    onNext,
    onBack,
    onExit,
    attackStages,
    prevention
}) {


    if (!node) {

        return null;

    }



    const imagePath =
        getImagePath(node.image);



    return (

        <div className="card">


            {

            node.type !== "attack_replay" && (

            <>

                <h2>

                    {node.title}

                </h2>


                <p>

                    {node.text}

                </p>


                {

                    imagePath && (

                        <img
                            src={imagePath}
                            alt={node.title}
                        />

                    )

                }

            </>

            )

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

                ))

            }




            {
                node.type === "attack_replay" && (
                    <>
                        <AttackReplay
                            stages={attackStages}
                        />

                        <PreventionBlock

                            preventionPoints={prevention}

                        />
                    </>
                )
            }





            {
                node.type !== "choice" &&
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
                onBack && (

                    <button
                        onClick={onBack}
                    >

                        Back

                    </button>

                )
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