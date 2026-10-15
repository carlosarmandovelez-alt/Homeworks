import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


export default function Login({ onCambiar }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="auth">
      <form className="auth__card" onSubmit={enviar}>
        <h1>📂 Gestor de Archivos</h1>
        <p>Inicia sesión para continuar</p>
        <input className="campo" type="email" placeholder="Correo" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input className="campo" type="password" placeholder="Contraseña" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button className="btn" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
        <button type="button" className="enlace" onClick={onCambiar}>
          ¿No tienes cuenta? Regístrate
        </button>
      </form>
    </main>
  );
}