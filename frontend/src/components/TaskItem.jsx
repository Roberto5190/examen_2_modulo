'use client';
import { useState } from "react";



export default function TaskItem({ task, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  const save = () => {
    onEdit(task.id, { title, priority });
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="border-l-4 p-2 rounded space-y-2">
        <input
          className="w-full border rounded p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="w-full border rounded p-1"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="baja">baja</option>
          <option value="media">media</option>
          <option value="alta">alta</option>
        </select>
        <button onClick={save} className="bg-green-600 text-white px-2 py-1 rounded">
          Guardar
        </button>
      </li>
    );
  }

  return (
    <li className="bg-gray-200 text-gray-700 shadow-[3px_3px_10px_#141111,-3px_-3px_10px_#4e4545] p-2 rounded flex justify-between">
      <div>
        <span className="font-semibold">{task.title}</span>{" "}
        <span className="text-sm italic">({task.priority})</span>
      </div>
      <div className="space-x-2">
        <button onClick={() => setEditing(true)} aria-label="Editar">
          ✎
        </button>
        <button onClick={() => onDelete(task.id)} aria-label="Borrar" className="text-red-600">
          🗑️
        </button>
      </div>
    </li>
  );
}
