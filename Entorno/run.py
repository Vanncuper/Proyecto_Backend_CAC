from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)


init_app(app)

CORS(app)

app.route('/', methods=['GET'])(index)
app.route('/api/evento/', methods=['POST'])(create_evento)
app.route('/api/evento/', methods=['GET'])(get_all_evento)
app.route('/api/evento/<int:evento_id>', methods=['GET'])(get_evento)
app.route('/api/evento/<int:evento_id>', methods=['PUT'])(update_evento)
app.route('/api/evento/<int:evento_id>', methods=['DELETE'])(delete_evento)

if __name__ == '__main__':
    app.run(debug=True)