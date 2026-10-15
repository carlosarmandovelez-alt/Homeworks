import { useState } from "react";
import { useArchivos } from "../context/FileSystemContext";

export default function FormNuevo({ padreId, onCerrar }) {
  const { crearNodo } = useArchivos();
  const [tipo, setTipo] = useState("carpeta");
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const nuevo = await crearNodo(padreId, { nombre, tipo, contenido });
    setEnviando(false);
    if (nuevo) onCerrar();
  };

  return (
    <form className="form-nuevo" onSubmit={enviar}>
      <div className="form-nuevo__tipos">
        {["carpeta", "archivo"].map((t) => (
          <label key={t} className={tipo === t ? "activo" : ""}>
            <input
              type="radio"
              name="tipo"
              value={t}
              checked={tipo === t}
              onChange={() => setTipo(t)}
            />
            {t === "carpeta" ? "📁 Carpeta" : "📄 Archivo"}
          </label>
        ))}
      </div>

      <input
        className="campo"
        placeholder={`Nombre de la ${tipo}`}
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        autoFocus
        required
      />

      {tipo === "archivo" && (
        <textarea
          className="campo"
          rows={4}
          placeholder="Contenido (opcional)"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />
      )}

      <div className="form-nuevo__acciones">
        <button type="button" className="btn btn--sec" onClick={onCerrar}>
          Cancelar
        </button>
        <button className="btn" disabled={enviando}>
          {enviando ? "Guardando..." : "Crear"}
        </button>
      </div>
    </form>
  );
}