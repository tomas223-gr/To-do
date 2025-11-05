import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Auth() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // Login / Signup toggle

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isLogin) {
      // LOGIN logic
      if (form.correo === "" || form.contraseña === "") {
        alert("Completa todos los campos");
        return;
      }
      // Simula login guardando token
      localStorage.setItem("token", "fake-token");
      navigate("/");
      return;
    }

    // SIGNUP logic
    if (form.nombre === "" || form.correo === "" || form.contraseña.length < 6) {
      alert("Completa los campos correctamente");
      return;
    }

    alert("Usuario registrado ✅ Ahora inicia sesión");
    setIsLogin(true);
  };

  return (
    <div className={`${darkMode ? "bg-[#111827] text-gray-200" : "bg-white text-gray-900"} min-h-screen p-10`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold">
          <Link to="/">Inicio</Link>
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>

      {/* Card */}
      <div className={`w-[450px] mx-auto px-8 py-6 rounded-xl shadow-lg border
        ${darkMode ? "border-gray-600 bg-[#1f2937]" : "border-gray-300 bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {/* Signup name */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Nombre completo"
            className={`border p-2 rounded-md w-full mb-4
            ${darkMode ? "bg-[#111827] border-gray-600" : "bg-gray-100 border-gray-400"}`}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          className={`border p-2 rounded-md w-full mb-4
          ${darkMode ? "bg-[#111827] border-gray-600" : "bg-gray-100 border-gray-400"}`}
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className={`border p-2 rounded-md w-full mb-4
          ${darkMode ? "bg-[#111827] border-gray-600" : "bg-gray-100 border-gray-400"}`}
          value={form.contraseña}
          onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mb-4"
        >
          {isLogin ? "Ingresar" : "Registrarse"}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            className="text-purple-400 hover:text-purple-300 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Crear una cuenta" : "Iniciar sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
