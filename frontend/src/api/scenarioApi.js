/**
 * ============================================================================
 * scenarioApi.js
 * ----------------------------------------------------------------------------
 * This file contains all functions responsible for communicating with the
 * backend server.
 *
 * Responsibilities:
 * - Send HTTP requests to the backend API.
 * - Retrieve cybersecurity scenario data.
 * - Return the JSON response to the frontend.
 *
 * Keeping API calls in a separate file makes the application easier to
 * maintain, as changes to backend endpoints only need to be updated here.
 * ============================================================================
 */

import axios from "axios";

/**
 * Base URL of the backend server.
 *
 * During development, the Flask backend runs locally on port 5000.
 * This value can later be replaced with a production server URL.
 */
const BASE_URL = "http://localhost:5000";

/**
 * Retrieves a cybersecurity scenario from the backend.
 *
 * The backend locates the appropriate JSON file based on:
 * - the selected system (database, website, network)
 * - the selected scenario ID
 *
 * Example request:
 * GET /scenarios/database/misconfigured_firewalls
 *
 * @param {string} system - The cybersecurity category
 *                          (e.g., "database", "website", "network").
 *
 * @param {string} scenarioId - The unique scenario filename
 *                              without the .json extension.
 *
 * @returns {Object} Complete scenario JSON.
 */
export async function fetchScenario(system, scenarioId) {

    // Send a GET request to the backend API.
    const response = await axios.get(
        `${BASE_URL}/scenarios/${system}/${scenarioId}`
    );

    // Return only the JSON data.
    return response.data;
}