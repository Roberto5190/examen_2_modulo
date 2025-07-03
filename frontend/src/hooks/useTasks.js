'use client'

import { useState, useEffect } from "react"
import { getTasks, addTask, deleteTask, updateTask } from "@/utils/api"

export default function useTasks() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [filter, setFilter]   = useState("");


    // Cargar al montar el componente
    useEffect(() => {
        (async () => {
            try {
                setTasks(await getTasks(filter))
            } catch {
                setError("No se pudo obtener las tareas")
            }
        })()
    }, [filter])

    // Crear tarea
    const createTask = async (title, priority) => {
        setLoading(true)
        setError("")


        try {
            const newTask = await addTask({ title, priority })
            setTasks((prev) => [...prev, newTask])

        } catch (err) {
            // leer JSON del backend (si es 400) 
            try {
                const msg = await err.response.json();    // fetch no llegó: usa resp
                setError(msg.error || "Error al crear tarea");
            } catch {
                setError("Error al crear tarea")
            }

        } finally {
            setLoading(false)
        }
    }

    const editTask = async (id, changes) => {
        try {
            const updated = await updateTask(id, changes);
            setTasks((prev) =>
                prev.map((t) => (t.id === id ? updated : t))
            );
        } catch {
            setError("Error al editar tarea");
        }
    };

    const removeTask = async (id) => {
        try {
            await deleteTask(id);                // ① petición DELETE
            setTasks((prev) => prev.filter(t => t.id !== id));   // ② act. estado
        } catch {
            setError("Error al borrar la tarea");
        }
    };

    // Retornamos las tareas, el loading, error y la nueva tarea
    return { tasks, loading, error, createTask, editTask, removeTask, filter, setFilter }
}





