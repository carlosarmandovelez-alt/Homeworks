import { useState } from "react";
import { useArchivos } from "../context/FileSystemContext";

export default function EditorArchivo({ archivo }) {
  const { guardarContenido } = useArchivos();
  const [texto, setTexto] = useState(archivo.contenido);
  const [guardado, setGuardado] = useState(false);

  const guardar = async () => {
    const ok = await guardarContenido(archivo.id, texto);
    setGuardado(ok !== null);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <div className="editor">
      <div className="contenido__barra">
        <h2>📄 {archivo.nombre}</h2>
        <button className="btn" onClick={guardar}>
          {guardado ? "✔ Guardado" : "Guardar"}
        </button>
      </div>
      <textarea
        className="campo editor__texto"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <small className="editor__meta">Creado por {archivo.creadoPor}</small>
    </div>
  );
}