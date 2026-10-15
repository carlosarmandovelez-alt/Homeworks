import NodoArchivo from "./NodoArchivo";

class ArbolArchivos {
  constructor(email) {
    this.creadoPor = email;
    this.raiz = new NodoArchivo({
      nombre: "Mi Unidad",
      tipo: "carpeta",
      creadoPor: email,
    });
  }

  
  buscarPorId(id, nodo = this.raiz) {
    if (!nodo) return null;
    if (nodo.id === id) return nodo;
    for (const hijo of nodo.hijos) {
      const encontrado = this.buscarPorId(id, hijo);
      if (encontrado) return encontrado;
    }
    return null;
  }

  buscarPadre(id, nodo = this.raiz) {
    if (!nodo) return null;
    for (const hijo of nodo.hijos) {
      if (hijo.id === id) return nodo;
      const encontrado = this.buscarPadre(id, hijo);
      if (encontrado) return encontrado;
    }
    return null;
  }

  
  obtenerRuta(id) {
    const ruta = [];
    const recorrer = (nodo) => {
      ruta.push(nodo);
      if (nodo.id === id) return true;
      for (const hijo of nodo.hijos) if (recorrer(hijo)) return true;
      ruta.pop();
      return false;
    };
    recorrer(this.raiz);
    return ruta;
  }

  validarUsuario(email) {
    if (!email) throw new Error("❌ Debes iniciar sesión para realizar esta acción");
  }

  agregar(padreId, datos, email) {
    this.validarUsuario(email);
    const padre = this.buscarPorId(padreId);
    if (!padre) throw new Error("❌ Carpeta padre no encontrada");
    if (!padre.esCarpeta()) {
      throw new Error("❌ Solo se puede agregar contenido a una carpeta");
    }
    if (padre.creadoPor !== email) {
      throw new Error("❌ No tienes permiso para modificar esta carpeta");
    }

    const nombre = (datos.nombre || "").trim();
    const repetido = padre.hijos.some(
      (h) => h.tipo === datos.tipo && h.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (repetido) throw new Error(`❌ Ya existe ${datos.tipo === "carpeta" ? "una carpeta" : "un archivo"} con ese nombre`);

    const nuevo = new NodoArchivo({
      nombre,
      tipo: datos.tipo,
      creadoPor: email,
      contenido: datos.contenido || "",
    });
    padre.agregarHijo(nuevo);
    return nuevo;
  }

  eliminar(id, email) {
    this.validarUsuario(email);
    if (id === this.raiz.id) throw new Error("❌ No se puede eliminar la raíz");
    const nodo = this.buscarPorId(id);
    const padre = this.buscarPadre(id);
    if (!nodo || !padre) throw new Error("❌ Elemento no encontrado");
    if (nodo.creadoPor !== email) {
      throw new Error("❌ No tienes permiso para eliminar este elemento");
    }
    padre.eliminarHijo(id);
  }

  renombrar(id, nuevoNombre, email) {
    this.validarUsuario(email);
    const nodo = this.buscarPorId(id);
    if (!nodo) throw new Error("❌ Nodo no encontrado");
    if (nodo.creadoPor !== email) {
      throw new Error("❌ No tienes permiso para renombrar este elemento");
    }
    const nombre = (nuevoNombre || "").trim();
    if (!nombre) throw new Error("❌ El nombre no puede estar vacío");
    nodo.nombre = nombre;
  }

  actualizarContenido(id, contenido, email) {
    this.validarUsuario(email);
    const nodo = this.buscarPorId(id);
    if (!nodo) throw new Error("❌ Archivo no encontrado");
    if (nodo.esCarpeta()) throw new Error("❌ No puedes editar una carpeta");
    if (nodo.creadoPor !== email) throw new Error("❌ Sin permisos");
    nodo.contenido = contenido;
  }

  dfs(nodo = this.raiz, resultado = []) {
    resultado.push(nodo);
    for (const hijo of nodo.hijos) this.dfs(hijo, resultado);
    return resultado;
  }

  
  aPlano() {
    const lista = [];
    const recorrer = (nodo, parentId) => {
      lista.push(nodo.toPlano(parentId));
      nodo.hijos.forEach((h) => recorrer(h, nodo.id));
    };
    recorrer(this.raiz, null);
    return lista;
  }

  static fromPlano(lista, email) {
    const arbol = new ArbolArchivos(email);
    const mapa = new Map();
    lista.forEach((item) => mapa.set(item.id, new NodoArchivo({ ...item, hijos: [] })));
    lista.forEach((item) => {
      const nodo = mapa.get(item.id);
      if (item.parentId === null) arbol.raiz = nodo;
      else mapa.get(item.parentId)?.agregarHijo(nodo);
    });
    return arbol;
  }

  clonar() {
    return ArbolArchivos.fromPlano(this.aPlano(), this.creadoPor);
  }

  toJSON() {
    return { creadoPor: this.creadoPor, raiz: this.raiz.toJSON() };
  }

  static fromJSON(json) {
    const arbol = new ArbolArchivos(json.creadoPor);
    arbol.raiz = NodoArchivo.fromJSON(json.raiz);
    return arbol;
  }
}

export default ArbolArchivos;