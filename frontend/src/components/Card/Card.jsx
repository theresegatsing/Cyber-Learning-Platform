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



export default function Card({
    node,
    onNext,
    onBack,
    onExit
}) {


    if (!node) {

        return null;

    }



    const imagePath =
        getImagePath(node.image);



    return (

        <div className="card">


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

                    <div className="attack-replay">

                        <h3>
                            Attack Replay
                        </h3>

                        <p>
                            Review how the attacker moved
                            through this attack.
                        </p>

                    </div>

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