import { useAuth } from "../hooks/useAuth";
import { useArchivos } from "../context/FileSystemContext";
import Sidebar from "../componentes/Sidebar";
import Contenido from "../componentes/Contenido";

const iniciales = (texto) =>
  texto
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

export default function FileManager() {
  const { user, nombreCompleto, logout } = useAuth();
  const { arbol, cargando, error, limpiarError } = useArchivos();
  const mostrar = nombreCompleto || user.email;

  return (
    <div className="app">
      <header className="topbar">
        <strong>📂 Gestor de Archivos</strong>
        <div className="topbar__user">
          <span className="topbar__avatar">{iniciales(mostrar)}</span>
          <span className="topbar__nombre">{mostrar}</span>
          <button className="btn btn--sec" onClick={logout}>Salir</button>
        </div>
      </header>

      {error && (
        <div className="error error--banner" onClick={limpiarError}>
          {error} <small>(clic para cerrar)</small>
        </div>
      )}

      {cargando ? (
        <p className="vacio">Cargando tu unidad...</p>
      ) : !arbol ? (
        <p className="vacio">
          No se pudo cargar tu unidad. Revisa el mensaje de arriba y recarga la página.
        </p>
      ) : (
        <div className="layout">
          <Sidebar />
          <Contenido />
        </div>
      )}
    </div>
  );
}