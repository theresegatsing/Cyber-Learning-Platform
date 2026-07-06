import axios from "axios";

const BASE_URL = "http://localhost:5000";


export async function fetchScenario(system, scenarioId) {

    const response = await axios.get(
        `${BASE_URL}/scenarios/${system}/${scenarioId}`
    );

    return response.data;
}