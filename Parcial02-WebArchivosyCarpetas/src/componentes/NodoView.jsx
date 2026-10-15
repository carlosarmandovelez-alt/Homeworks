import { useState } from "react";
import { useArchivos } from "../context/FileSystemContext";


export default function NodoView({ nodo, nivel = 0 }) {
  const { seleccionadoId, setSeleccionadoId } = useArchivos();
  const [abierto, setAbierto] = useState(nivel === 0);
  const esCarpeta = nodo.esCarpeta();
  const activo = seleccionadoId === nodo.id;

  const alClick = () => {
    setSeleccionadoId(nodo.id);
    if (esCarpeta) setAbierto((v) => !v);
  };

  return (
    <li className="nodo">
      <button
        className={`nodo__fila ${activo ? "nodo__fila--activo" : ""}`}
        style={{ paddingLeft: `${nivel * 16 + 8}px` }}
        onClick={alClick}
        title={`Creado por ${nodo.creadoPor}`}
      >
        <span className="nodo__flecha">{esCarpeta ? (abierto ? "▾" : "▸") : ""}</span>
        <span className="nodo__icono">{esCarpeta ? (abierto ? "📂" : "📁") : "📄"}</span>
        <span className="nodo__nombre">{nodo.nombre}</span>
      </button>

      {esCarpeta && abierto && nodo.hijos.length > 0 && (
        <ul className="nodo__hijos">
          {nodo.hijos.map((h) => (
            <NodoView key={h.id} nodo={h} nivel={nivel + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}