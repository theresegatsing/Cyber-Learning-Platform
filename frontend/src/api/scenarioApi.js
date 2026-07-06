import axios from "axios";

const BASE_URL = "http://localhost:5000";

export async function fetchScenario(system, scenarioId) {
  const res = await axios.get(
    `${BASE_URL}/scenarios/${system}/${scenarioId}`
  );

  return res.data;
}