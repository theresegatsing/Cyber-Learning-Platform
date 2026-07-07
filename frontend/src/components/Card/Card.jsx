/**
 * ============================================================================
 * Card.jsx
 * ----------------------------------------------------------------------------
 * The Card component is responsible for displaying a single scenario node.
 *
 * Responsibilities:
 * - Display the current node's title, description, and illustration.
 * - Display interactive choices when required.
 * - Allow the learner to progress through the scenario.
 *
 * Every scenario is made up of a sequence of nodes stored in a JSON file.
 * The Card component simply renders whichever node is currently active.
 * ============================================================================
 */

import "./Card.css";

/**
 * Displays a single scenario card.
 *
 * Depending on the node type, the card can:
 * - display information
 * - present a story
 * - ask a multiple-choice question
 * - display feedback
 * - display a summary
 *
 * @param {Object} node - The current node from the scenario JSON.
 * @param {Function} onNext - Function used to navigate to the next node.
 */
export default function Card({ node, onNext }) {

    /**
     * If no node exists, render nothing.
     *
     * This prevents React from trying to display
     * incomplete data while the scenario is loading.
     */
    if (!node) {
        return null;
    }

    /**
     * Determine where the image is stored.
     *
     * - Icons are stored in:
     *      src/assets/icons/
     *
     * - Scenario illustrations are stored in:
     *      src/assets/illustrations/
     *          ├── database/
     *          ├── website/
     *          └── network/
     */
    const imagePath = node.image
        ? node.image.startsWith("icons/")
            ? `/assets/${node.image}`
            : `/assets/illustrations/${node.image}`
        : null;

    return (

        <div className="card">

            {/* Display the title of the current card */}
            <h2>{node.title}</h2>

            {/* Display the main content of the card */}
            <p>{node.text}</p>

            {/*
                Display an illustration or icon if one exists.

                The component automatically determines whether the
                image belongs to the icons folder or one of the
                illustration folders.
            */}
            {imagePath && (

                <img
                    src={imagePath}
                    alt={node.title}
                />

            )}

            {/*
                If this node is a multiple-choice question,
                display one button for each available choice.
            */}
            {node.type === "choice" &&
                node.choices.map((choice, index) => (

                    <button
                        key={index}
                        onClick={() => onNext(choice.next)}
                    >
                        {choice.text}
                    </button>

                ))}

            {/*
                For every other node type (story, information,
                feedback, summary, etc.), display a Continue
                button if another node exists.
            */}
            {node.type !== "choice" && node.next && (

                <button
                    onClick={() => onNext(node.next)}
                >
                    Continue
                </button>

            )}

        </div>

    );

}