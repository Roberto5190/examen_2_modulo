from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db
import os


app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

# Config SQLite - crea tasks.db en la raiz 
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'tasks.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from routes.tasks import tasks_bp
app.register_blueprint(tasks_bp)





if __name__ == "__main__":

    # Ejecutar con python app.py si prefieres, pero usaremos flask run
    app.run(debug=True)
