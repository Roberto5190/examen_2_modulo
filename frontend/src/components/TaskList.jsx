'use client'
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete }) {
    if (!tasks.length) return <p className="text-gray-500">Sin tareas…</p>;
    return (
      <ul className="space-y-4">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ul>
    );
  }
  