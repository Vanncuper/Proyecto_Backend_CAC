from app.database import get_db

class Evento:
    
    def __init__(self, id_evento=None, titulo=None,  fecha=None, descripcion=None, imagen=None):
        self.id_evento = id_evento
        self.titulo = titulo
        self.fecha = fecha
        self.descripcion = descripcion
        self.imagen = imagen

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_evento:
            cursor.execute("""
                UPDATE evento SET titulo = %s, fecha = %s,  descripcion = %s , imagen = %s
                WHERE id_evento = %s
            """, (self.titulo,  self.fecha, self.descripcion, self.imagen, self.id_evento))
        else:
            cursor.execute("""
                INSERT INTO evento (titulo,  fecha, descripcion, imagen) VALUES (%s, %s, %s, %s)
            """, (self.titulo,  self.fecha, self.descripcion, self.imagen))
            self.id_evento = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM evento WHERE fecha > CURRENT_DATE ORDER BY fecha ASC")
        rows = cursor.fetchall()
        evento = [Evento(id_evento=row[0], titulo=row[1], fecha=row[2], descripcion=row[3], imagen=row[4]) for row in rows]
        cursor.close()
        return evento

    @staticmethod
    def get_by_id(evento_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM evento WHERE id_evento = %s", (evento_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Evento(id_evento=row[0], titulo=row[1],  fecha=row[2], descripcion=row[3], imagen=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM evento WHERE id_evento = %s", (self.id_evento,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_evento': self.id_evento,
            'titulo': self.titulo,
            'fecha': self.fecha.strftime('%Y-%m-%d'),
            'descripcion': self.descripcion,
            'imagen': self.imagen
        }


