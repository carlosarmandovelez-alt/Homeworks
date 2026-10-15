import { useState } from "react";
import { useArchivos } from "../context/FileSystemContext";
import FormNuevo from "./FormNuevo";
import EditorArchivo from "./EditorArchivo";

const formatear = (iso) =>
  new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

export default function Contenido() {
  const { arbol, seleccionadoId, setSeleccionadoId, eliminarNodo, renombrarNodo } = useArchivos();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");

  const nodo = arbol.buscarPorId(seleccionadoId) || arbol.raiz;
  const ruta = arbol.obtenerRuta(nodo.id);

  const iniciarEdicion = (n) => {
    setEditandoId(n.id);
    setNombreEdit(n.nombre);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEdit("");
  };

  const confirmarEdicion = async (n) => {
    const nuevo = nombreEdit.trim();
    if (nuevo && nuevo !== n.nombre) {
      await renombrarNodo(n.id, nuevo);
    }
    cancelarEdicion();
  };

  const eliminar = (n) => {
    const extra = n.esCarpeta() && !n.isLeaf() ? " Se eliminará también todo su contenido." : "";
    if (window.confirm(`¿Eliminar "${n.nombre}"?${extra}`)) eliminarNodo(n.id);
  };

  return (
    <section className="contenido">
      <nav className="breadcrumb">
        {ruta.map((n, i) => (
          <span key={n.id}>
            <button onClick={() => setSeleccionadoId(n.id)}>{n.nombre}</button>
            {i < ruta.length - 1 && " / "}
          </span>
        ))}
      </nav>

      {nodo.esArchivo() ? (
        <EditorArchivo key={nodo.id} archivo={nodo} />
      ) : (
        <>
          <div className="contenido__barra">
            <h2>{nodo.nombre}</h2>
            <button className="btn" onClick={() => setMostrarForm((v) => !v)}>
              {mostrarForm ? "Cerrar" : "+ Nuevo"}
            </button>
          </div>

          {mostrarForm && (
            <FormNuevo padreId={nodo.id} onCerrar={() => setMostrarForm(false)} />
          )}

          {nodo.isLeaf() ? (
            <p className="vacio">Esta carpeta está vacía.</p>
          ) : (
            <div className="grid">
              {nodo.hijos.map((h) => {
                const editando = editandoId === h.id;
                return (
                  <article key={h.id} className="tarjeta">
                    {editando ? (
                      <div className="tarjeta__edicion">
                        <span className="tarjeta__icono">{h.esCarpeta() ? "📁" : "📄"}</span>
                        <input
                          className="campo"
                          value={nombreEdit}
                          autoFocus
                          onChange={(e) => setNombreEdit(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") confirmarEdicion(h);
                            if (e.key === "Escape") cancelarEdicion();
                          }}
                        />
                        <div className="tarjeta__edicion-botones">
                          <button className="btn" onClick={() => confirmarEdicion(h)}>✔</button>
                          <button className="btn btn--sec" onClick={cancelarEdicion}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button className="tarjeta__abrir" onClick={() => setSeleccionadoId(h.id)}>
                          <span className="tarjeta__icono">{h.esCarpeta() ? "📁" : "📄"}</span>
                          <span className="tarjeta__nombre">{h.nombre}</span>
                        </button>
                        <small className="tarjeta__meta">
                          {h.creadoPor}
                          <br />
                          {formatear(h.fechaCreacion)}
                        </small>
                        <div className="tarjeta__acciones">
                          <button onClick={() => iniciarEdicion(h)} title="Renombrar">✏️</button>
                          <button onClick={() => eliminar(h)} title="Eliminar">🗑️</button>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}