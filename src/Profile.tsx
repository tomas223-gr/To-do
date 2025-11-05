
//
//
//Se usan unos datos de manera estática para poder ver el funcionamiento de el componente
//se puede sustituír por un estado global en zustand, pero estamos a la espera del DB y el backend para
//empezar a hacer peticiones 
//se subirá al repo para que hagan despliegue,después con el backend hecho haremos fetch para traer datos

import { useState } from "react";
import {Link} from "react-router-dom"
type Persona = {
  nombre: string;
  correo: string;
  contraseña: string;
};


export default function Profile() {
  const [darkMode, setDarkMode] = useState(true);

  const [persona, setPersona] = useState<Persona>({
    nombre: "Alejandro Torres",
    correo: "alejandro@mail.com",
    contraseña: "123456",
  });

  const [showPassModal, setShowPassModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = () => {
    if (newPassword.trim() === "" || newPassword.length < 6) {
      alert("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    setPersona({ ...persona, contraseña: newPassword });
    setShowPassModal(false);
    setNewPassword("");
    alert(" Contraseña actualizada mi perro");
  };

  return (
    <div className={`${darkMode ? "bg-[#111827] text-gray-200" : "bg-white text-gray-900"} min-h-screen p-10`}>
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold">
            
        <Link to="/">
        Inicio
        </Link>
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>

      <div className={`w-[500px] mx-auto px-8 py-6 rounded-xl shadow-lg border 
        ${darkMode ? "border-gray-600 bg-[#1f2937]" : "border-gray-300 bg-white"}`}
      >
        <h2 className="text-2xl font-bold mb-6">Información del usuario</h2>

        <div className="mb-4">
          <span className="font-semibold">Nombre:</span>
          <p>{persona.nombre}</p>
        </div>

        <div className="mb-4">
          <span className="font-semibold">Correo:</span>
          <p>{persona.correo}</p>
        </div>

        <button
          onClick={() => setShowPassModal(true)}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Cambiar contraseña
        </button>
      </div>

      {showPassModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className={`p-8 rounded-xl w-[400px] border 
            ${darkMode ? "bg-[#1f2937] border-gray-600" : "bg-white border-gray-300"}`}>
            
            <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>

            <input
              type="password"
              placeholder="Nueva contraseña"
              className={`border p-2 rounded-md w-full mb-4 
                ${darkMode ? "bg-[#111827] border-gray-600" : "bg-gray-100 border-gray-400"}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>

              <button
                onClick={updatePassword}
                className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
