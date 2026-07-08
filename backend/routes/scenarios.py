"""
============================================================================
scenarios.py
----------------------------------------------------------------------------
API routes responsible for loading cybersecurity scenarios.

Endpoint example:

GET:
    /scenarios/database/misconfigured_firewalls

returns:

    backend/scenarios/database/
        misconfigured_firewalls.json

============================================================================
"""


from flask import Blueprint, jsonify

from services.scenario_service import load_scenario



scenario_bp = Blueprint(
    "scenarios",
    __name__
)



@scenario_bp.route(
    "/<system>/<scenario_id>",
    methods=["GET"]
)
def get_scenario(system, scenario_id):

    """
    Retrieve a scenario JSON file.

    Example:

    system = database
    scenario_id = misconfigured_firewalls

    Loads:

    scenarios/database/misconfigured_firewalls.json
    """

    scenario = load_scenario(
        system,
        scenario_id
    )


    return jsonify(scenario)