"""
============================================================================
app.py
----------------------------------------------------------------------------
Main entry point for the Cyber Learning Platform backend.

Responsibilities:
- Creates the Flask application.
- Registers API routes.
- Starts the backend server.

Frontend communication:

React frontend
      |
      | GET /scenarios/database/misconfigured_firewalls
      ↓
Flask backend
      |
      ↓
JSON scenario file
============================================================================
"""

from flask import Flask
from flask_cors import CORS

from routes.scenarios import scenario_bp



def create_app():

    """
    Creates and configures the Flask application.

    Returns:
        Flask application instance
    """

    app = Flask(__name__)


    # Allow React frontend (localhost:5173)
    # to communicate with Flask backend (localhost:5000)
    CORS(app)


    # Register scenario API routes
    app.register_blueprint(
        scenario_bp,
        url_prefix="/scenarios"
    )


    return app



if __name__ == "__main__":

    app = create_app()

    app.run(
        debug=True,
        port=5000
    )