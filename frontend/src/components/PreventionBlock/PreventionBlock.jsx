/**
 * ============================================================================
 * PreventionBlock.jsx
 * ----------------------------------------------------------------------------
 * Displays the prevention opportunities stored inside the scenario JSON.
 *
 * Every prevention point corresponds to one stage of the attack and explains
 * how the organization could have stopped or reduced the attack.
 *
 * The data comes directly from:
 *
 * "prevention_points"
 *
 * inside each scenario JSON.
 * ============================================================================
 */

import "./PreventionBlock.css";

export default function PreventionBlock({ preventionPoints }) {

    if (!preventionPoints || preventionPoints.length === 0) {
        return null;
    }

    return (

        <div className="prevention-block">

            <h2>
                Prevention Opportunities
            </h2>

            <p>
                These security measures could interrupt the attack before it
                reaches its objective.
            </p>

            {

                preventionPoints.map((point, index) => (

                    <div
                        key={index}
                        className="prevention-card"
                    >

                        <h3>
                            {point.title}
                        </h3>

                        <p>
                            {point.description}
                        </p>

                        <small>

                            Attack Stage:
                            {" "}
                            {point.stage.replaceAll("_"," ")}

                        </small>

                    </div>

                ))

            }

        </div>

    );

}