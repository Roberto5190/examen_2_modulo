'use client'
// COMPONENTS
import FilterBar from "@/components/FilterBar";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

// HOOKS
import useTasks from "@/hooks/useTasks";




export default function Home() {
  //  DESTRUCTURING HOOK TASK
  const {
    tasks, loading, error,
    createTask, editTask, removeTask,
    filter, setFilter
  } = useTasks()

  return (
    <div className="bg-[#312b2b] flex flex-col items-center justify-center gap-12 p-12">
      <h1 className="text-6xl font-[900] font-Poppins text-gray-300 ">Lista de tareas</h1>

      <div className="flex flex-col items-center justify-center gap-4">
        <TaskForm loading={loading} createTasks={createTask}></TaskForm>
        <FilterBar active={filter} onChange={setFilter} />
      </div>




      <TaskList tasks={tasks} onEdit={editTask} onDelete={removeTask}></TaskList>

    </div>
  );
}
