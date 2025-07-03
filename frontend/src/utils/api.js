export const API_URL = "http://127.0.0.1:5000/api/tasks"

// TRAER
export async function getTasks(priority = "") {
    const url = priority
        ? `${API_URL}?priority=${priority}`
        : API_URL;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener tareas");
    return res.json();
}

// AÑADIR
export async function addTask(data) {
    const res = await fetch(API_URL,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
    )
    if (!res.ok) throw new Error("Error al añadir tarea")
    return res.json()
}

// ACTUALIZAR
export async function updateTask(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al editar tarea");
    return res.json();
}

// ELIMINAR
export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo borrar la tarea");
}