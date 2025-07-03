'use client'

import { useState, useEffect } from "react"

function TaskForm({ createTasks, loading }) {

    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState("baja")
    const [formError, setFormError] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault()

        // VALIDACIÓN
        if (!title.trim()) {

            setFormError("El título es obligatorio")

            return //no hace la petición
        }


        createTasks(title, priority)

        // limpiar mensaje y continuar
        setFormError("");

        // Reset del form
        setTitle("")
        setPriority("baja")

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex items-center justify-center gap-6">

                {/* TITLE */}
                <input
                    type="text"
                    className="bg-gray-200 rounded-full text-black px-3 py-1"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-gray-200 text-gray-900 px-3 py-1 rounded-lg"
                >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>

                <button type="submit" disabled={loading} className="bg-black hover:bg-gray-200 text-gray-200 hover:text-black font-[500] cursor-pointer px-3 py-1 rounded-full">
                    {loading ? "Agregando..." : "Agregar tarea"}
                </button>


            </form>
            {formError && (
                    <p className="text-red-800 bg-red-200 italic px-3 py-1 rounded-sm  ">{formError}</p>
                )}
        </>
    )
}

export default TaskForm