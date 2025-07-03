from flask_sqlalchemy import SQLAlchemy
from . import db

class Task(db.Model):
    id =db.Column(db.Integer, primary_key=True)
    title =db.Column(db.String(120), nullable=False)
    priority = db.Column(db.String(10), nullable=False)

    def serialize(self):
        return {"id": self.id, "title": self.title, "priority": self.priority}