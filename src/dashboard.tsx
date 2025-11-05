//OPCIONAL: Agregar una sección de descripción, pues en el muckup está para agregar una descripción extra a la tarea
//Opcional: Agregar una sección para ver mejor la tarea y en la misma esté el botón Editar para cambiar la info

import { useState } from "react";
import { Link } from "react-router-dom";

type Priority = "High" | "Medium" | "Low";

const priorityColors: Record<Priority, string> = {
  High: "bg-red-600",
  Medium: "bg-yellow-400",
  Low: "bg-green-300",
};

// ✅ Detecta si la tarea es HOY (para notificación visual)
const isToday = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy notebooks", date: "2025-02-08", priority: "High" as Priority, selected: false },
    { id: 2, title: "Study SQL", date: "2025-02-01", priority: "Medium" as Priority, selected: false },
    { id: 3, title: "Go to the gym", date: "2025-02-28", priority: "Low" as Priority, selected: false },
  ]);

  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all");
  const [filter, setFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState<{ title: string; date: string; priority: Priority }>({
    title: "",
    date: "",
    priority: "Low",
  });

  const toggleSelect = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, selected: !task.selected } : task
    ));
  };

  const deleteTask = (id: number) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar esta tarea?");
    if (confirmDelete) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const addTask = () => {
    if (newTask.title.trim() === "" || newTask.date.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      date: newTask.date,
      priority: newTask.priority,
      selected: false,
    };
    setTasks([...tasks, newTaskObj]);
    setShowModal(false);
    setNewTask({ title: "", date: "", priority: "Low" });
  };

  // ✅ FILTROS DE FECHA
  const dateFilteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const now = new Date();

    if (filter === "today") return taskDate.toDateString() === now.toDateString();
    if (filter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return taskDate >= weekAgo && taskDate <= now;
    }
    if (filter === "month") {
      return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  // ✅ FILTRO COMPLETADAS / PENDIENTES
  const filteredTasks = dateFilteredTasks.filter(task => {
    if (statusFilter === "completed") return task.selected;
    if (statusFilter === "pending") return !task.selected;
    return true;
  });

  const pendingCount = tasks.filter(task => !task.selected).length;
  const completedCount = tasks.filter(task => task.selected).length;

  return (
    <div className={`${darkMode ? "bg-[#111827] text-gray-200" : "bg-white text-gray-900"} min-h-screen font-sans transition`}>

      {/* HEADER */}
      <header className="py-14 text-center relative">
        <h1 className="text-5xl font-extrabold tracking-wide">Dashboard</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
        >
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>

        <button
          className="mt-6 text-xl font-semibold bg-purple-600 px-8 py-3 rounded-2xl hover:bg-purple-700 transition"
          onClick={() => setShowModal(true)}
        >
          New Task
        </button>
      </header>

      {/* NAV */}
      <nav className={`mt-6 w-[90%] mx-auto border-b ${darkMode ? "border-gray-600" : "border-gray-300"} pb-3 flex justify-between items-center`}>
        <div className="flex gap-8 text-gray-300 font-medium text-lg">
          <button className="px-4 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition">Logo</button>

          <button className="text-purple-300 font-semibold hover:text-white transition">
            <Link to="/profile">
            Perfil
            </Link>
          </button>
          <button className="hover:text-white transition">Logout</button>
         
        </div>

        <div className="flex items-center gap-2">
          <input className={`outline-none border-b ${darkMode ? "border-gray-500" : "border-gray-400"} bg-transparent px-2 py-1`} placeholder="Search" />
          <button className="hover:text-white transition">🔍</button>
        </div>
      </nav>

      {/* CONTADORES */}
      <div className="w-[90%] mx-auto mt-6 flex gap-8 text-lg font-semibold">
        <span>Pendientes: {pendingCount}</span>
        <span>Completadas: {completedCount}</span>
      </div>

      {/* BOTONES DE ORDENAR */}
      <div className="w-[90%] mx-auto mt-4 flex gap-4">
        <button
          onClick={() => setTasks([...tasks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Ordenar por Fecha 📅
        </button>

        <button
          onClick={() =>
            setTasks([...tasks].sort((a, b) => {
              const order = { High: 1, Medium: 2, Low: 3 };
              return order[a.priority] - order[b.priority];
            }))
          }
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Ordenar por Prioridad ⚡
        </button>
      
      </div>
                
      {/* TASK LIST */}
      <div className="mt-14 flex flex-col items-center gap-6">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`w-[720px] flex items-center justify-between px-8 py-4 rounded-full shadow-lg border
            ${isToday(task.date) ? "border-yellow-400 bg-yellow-50/10" : "border-gray-700 bg-[#1f2937]"}`}
          >
            <div className="flex items-center gap-6">
              <button
                onClick={() => toggleSelect(task.id)}
                className={`w-9 h-9 rounded-full border-2 border-purple-500 flex items-center justify-center transition ${task.selected ? "bg-purple-600" : ""}`}
              >
                {task.selected && <div className="w-3 h-3 bg-white rounded-full"></div>}
              </button>

              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-xs opacity-60">{task.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`${priorityColors[task.priority]} text-white px-6 py-2 rounded-full text-sm font-semibold`}>
                {task.priority}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600 text-2xl transition"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-[#1f2937] p-8 rounded-xl w-[400px] flex flex-col gap-4 border border-gray-600">
            <h2 className="text-2xl font-bold text-center">Add New Task</h2>

            <input className="border p-2 rounded-md bg-[#111827]" placeholder="Task Title"
              value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />

            <input type="date" className="border p-2 rounded-md bg-[#111827]"
              value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />

            <select className="border p-2 rounded-md bg-[#111827]"
              value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Priority })}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700" onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}



