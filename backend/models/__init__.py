from flask_sqlalchemy import SQLAlchemy

# Instancia global: otros módulos importarán 'db' de aquí
db = SQLAlchemy()

# Importa el modelo para que quede registrado cuando se importe 'models'
from .tasks import Task