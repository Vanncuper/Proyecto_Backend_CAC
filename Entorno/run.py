from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Configurar la aplicación Flask
# app.config.from_pyfile('config/development.py')

# Inicializar la base de datos con la aplicación Flask
init_app(app)
#permitir solicitudes desde cualquier origen
CORS(app)
#permitir solicitudes desde un origen específico
# CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})

# Rutas para el CRUD de la entidad evento
app.route('/', methods=['GET'])(index)
app.route('/api/evento/', methods=['POST'])(create_evento)
app.route('/api/evento/', methods=['GET'])(get_all_evento)
app.route('/api/evento/<int:evento_id>', methods=['GET'])(get_evento)
app.route('/api/evento/<int:evento_id>', methods=['PUT'])(update_evento)
app.route('/api/evento/<int:evento_id>', methods=['DELETE'])(delete_evento)

if __name__ == '__main__':
    app.run(debug=True)