import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ArbolArchivos from "../estructura/ArbolArchivos";

const COLECCION = "arboles";


export function useFileSystem(user) {
  const [arbol, setArbol] = useState(null);
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const guardar = useCallback(
    async (arbolNuevo) => {
      await setDoc(doc(db, COLECCION, user.uid), {
        uid: user.uid,
        creadoPor: user.email,
        actualizadoEn: new Date().toISOString(),
        nodos: arbolNuevo.aPlano(),
      });
    },
    [user]
  );

  // Cargar (o crear) el árbol al iniciar sesión
  useEffect(() => {
    if (!user) {
      setArbol(null);
      setCargando(false);
      return;
    }
    let activo = true;
    (async () => {
      setCargando(true);
      try {
        const snap = await getDoc(doc(db, COLECCION, user.uid));
        let cargado;
        if (snap.exists()) {
          cargado = ArbolArchivos.fromPlano(snap.data().nodos, user.email);
        } else {
          cargado = new ArbolArchivos(user.email);
          await guardar(cargado);
        }
        if (activo) {
          setArbol(cargado);
          setSeleccionadoId(cargado.raiz.id);
        }
      } catch (e) {
        if (activo) setError("No se pudo cargar el árbol: " + e.message);
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, [user, guardar]);

  // Trabaja sobre una copia; si falla algo, el estado visible no cambia
  const ejecutar = useCallback(
    async (accion) => {
      setError("");
      try {
        if (!user?.email) throw new Error("❌ Debes estar registrado para modificar el árbol");
        const copia = arbol.clonar();
        const resultado = accion(copia, user.email);
        await guardar(copia);
        setArbol(copia);
        return resultado;
      } catch (e) {
        setError(e.message);
        return null;
      }
    },
    [arbol, user, guardar]
  );

  const crearNodo = (padreId, datos) =>
    ejecutar((a, email) => a.agregar(padreId, datos, email));

  const eliminarNodo = async (id) => {
    const padre = arbol.buscarPadre(id);
    const ok = await ejecutar((a, email) => {
      a.eliminar(id, email);
      return true;
    });
    if (ok && padre) setSeleccionadoId(padre.id);
  };

  const renombrarNodo = (id, nombre) =>
    ejecutar((a, email) => a.renombrar(id, nombre, email));

  const guardarContenido = (id, contenido) =>
    ejecutar((a, email) => a.actualizarContenido(id, contenido, email));

  return {
    arbol,
    cargando,
    error,
    limpiarError: () => setError(""),
    seleccionadoId,
    setSeleccionadoId,
    crearNodo,
    eliminarNodo,
    renombrarNodo,
    guardarContenido,
  };
}