"""
============================================================================
scenario_service.py
----------------------------------------------------------------------------
Handles loading scenario JSON files from storage.
============================================================================
"""


import json
from pathlib import Path



BASE_DIR = Path(__file__).resolve().parent.parent



SCENARIO_DIR = (
    BASE_DIR / "scenarios"
)



def load_scenario(system, scenario_id):

    """
    Loads a scenario JSON file.

    Example:

    system:
        database

    scenario_id:
        misconfigured_firewalls


    Path created:

    scenarios/database/misconfigured_firewalls.json
    """


    file_path = (
        SCENARIO_DIR
        / system
        / f"{scenario_id}.json"
    )


    if not file_path.exists():

        raise FileNotFoundError(
            f"Scenario not found: {file_path}"
        )


    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)