import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Register({ onCambiar }) {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.nombre.trim() || !form.apellido.trim()) {
      return setError("Ingresa tu nombre y apellido");
    }
    if (form.password !== form.confirmar) {
      return setError("Las contraseñas no coinciden");
    }
    setCargando(true);
    try {
      await register(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="auth">
      <form className="auth__card" onSubmit={enviar}>
        <h1>Crear cuenta</h1>
        <p>Regístrate para gestionar tus carpetas</p>

        <div className="auth__fila">
          <input className="campo" name="nombre" placeholder="Nombre"
            value={form.nombre} onChange={cambiar} required />
          <input className="campo" name="apellido" placeholder="Apellido"
            value={form.apellido} onChange={cambiar} required />
        </div>

        <input className="campo" type="email" name="email" placeholder="Correo"
          value={form.email} onChange={cambiar} required />
        <input className="campo" type="password" name="password" placeholder="Contraseña (mín. 6)"
          value={form.password} onChange={cambiar} required />
        <input className="campo" type="password" name="confirmar" placeholder="Confirmar contraseña"
          value={form.confirmar} onChange={cambiar} required />

        {error && <div className="error">{error}</div>}
        <button className="btn" disabled={cargando}>
          {cargando ? "Creando..." : "Registrarme"}
        </button>
        <button type="button" className="enlace" onClick={onCambiar}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </form>
    </main>
  );
}