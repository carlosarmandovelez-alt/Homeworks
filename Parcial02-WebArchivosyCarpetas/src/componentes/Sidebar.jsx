import { useArchivos } from "../context/FileSystemContext";
import NodoView from "./NodoView";

export default function Sidebar() {
  const { arbol } = useArchivos();
  return (
    <aside className="sidebar">
      <h2 className="sidebar__titulo">Explorador</h2>
      <ul className="sidebar__arbol">
        <NodoView nodo={arbol.raiz} />
      </ul>
    </aside>
  );
}