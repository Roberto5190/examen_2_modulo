from flask import Blueprint, request, jsonify
from models import db, Task

# # Almacén en memoria
# tasks = []


tasks_bp = Blueprint("tasks", __name__, url_prefix="/api/tasks")

# RECUPERAR TAREAS
@tasks_bp.get("")
def get_tasks():
    prio = request.args.get("priority", type=str)

    query = Task.query
    if prio in {"baja", "media", "alta"}:
        query = query.filter_by(priority=prio)

    tasks = query.all()
    return jsonify([t.serialize() for t in tasks]), 200

# CREAR TAREAS
@tasks_bp.post("")
def add_task():
    data = request.get_json(force=True) or {}
    title = data.get("title", "").strip()
    priority = data.get("priority", "").strip().lower()

    # VALIDACION
    if not title:
        return jsonify({"error": "El título es obligatorio"}), 400

    if priority not in {"baja", "media", "alta"}:
        return jsonify({"error": "Prioridad inválida"}), 400
    

    task = Task(title=title, priority=priority)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.serialize()), 201


# DELETE
@tasks_bp.delete("/<int:task_id>")
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return "", 204     


# PUT
# PUT ───── editar una tarea existente
@tasks_bp.put("/<int:task_id>")
def update_task(task_id):
    task = Task.query.get_or_404(task_id)

    data = request.get_json(force=True) or {}
    title    = data.get("title", task.title).strip()
    priority = data.get("priority", task.priority).strip().lower()

    if not title or priority not in {"baja", "media", "alta"}:
        return jsonify({"error": "Datos inválidos"}), 400

    task.title    = title
    task.priority = priority
    db.session.commit()
    return jsonify(task.serialize()), 200