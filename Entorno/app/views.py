from flask import jsonify, request
from app.models import Evento

def index():
    return jsonify({'message': 'funcionando'})

def create_evento():
    data = request.json
    new_event = Evento(titulo=data['titulo'],  fecha=data['fecha'], descripcion=data['descripcion'], imagen=data['imagen'])
    new_event.save()
    return jsonify({'message': 'Evento created successfully'}), 201

def get_all_evento():
    evento = Evento.get_all()
    return jsonify([event.serialize() for event in evento])

def get_evento(evento_id):
    event = Evento.get_by_id(evento_id)
    if not event:
        return jsonify({'message': 'Evento not found'}), 404
    return jsonify(event.serialize())

def update_evento(evento_id):
    event = Evento.get_by_id(evento_id)
    if not event:
        return jsonify({'message': 'Evento not found'}), 404
    data = request.json
    event.titulo = data['titulo']
    event.fecha = data['fecha']
    event.descripcion = data['descripcion']
    event.imagen = data['imagen']
    event.save()
    return jsonify({'message': 'Evento updated successfully'})

def delete_evento(evento_id):
    event = Evento.get_by_id(evento_id)
    if not event:
        return jsonify({'message': 'Evento not found'}), 404
    event.delete()
    return jsonify({'message': 'Evento deleted successfully'})