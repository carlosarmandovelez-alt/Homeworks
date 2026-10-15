class NodoArchivo {
  constructor(datos) {
    const nombre = (datos.nombre || "").trim();
    if (!nombre) throw new Error("❌ El nombre no puede estar vacío");
    if (!["carpeta", "archivo"].includes(datos.tipo)) {
      throw new Error("❌ Tipo inválido: debe ser 'carpeta' o 'archivo'");
    }
    if (!datos.creadoPor) throw new Error("❌ Falta el correo del creador");

    this.id = datos.id || this.generarId();
    this.nombre = nombre;
    this.tipo = datos.tipo;
    // Un archivo NUNCA tiene hijos
    this.hijos = datos.tipo === "carpeta" ? datos.hijos || [] : [];
    this.creadoPor = datos.creadoPor;
    this.fechaCreacion = datos.fechaCreacion || new Date().toISOString();
    // Solo los archivos tienen contenido
    this.contenido = datos.tipo === "archivo" ? datos.contenido || "" : "";
  }

  generarId() {
    const azar =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 11);
    return `nodo_${Date.now()}_${azar}`;
  }

  esCarpeta() {
    return this.tipo === "carpeta";
  }

  esArchivo() {
    return this.tipo === "archivo";
  }

  isLeaf() {
    return this.hijos.length === 0;
  }

  agregarHijo(nodo) {
    if (!this.esCarpeta()) throw new Error("❌ Un archivo no puede tener hijos");
    this.hijos.push(nodo);
  }

  eliminarHijo(id) {
    if (!this.esCarpeta()) throw new Error("❌ Un archivo no puede tener hijos");
    this.hijos = this.hijos.filter((h) => h.id !== id);
  }

  
  toPlano(parentId = null) {
    return {
      id: this.id,
      parentId,
      nombre: this.nombre,
      tipo: this.tipo,
      creadoPor: this.creadoPor,
      fechaCreacion: this.fechaCreacion,
      contenido: this.contenido,
    };
  }

  toJSON() {
    return {
      ...this.toPlano(),
      hijos: this.hijos.map((h) => h.toJSON()),
    };
  }

  static fromJSON(json) {
    const nodo = new NodoArchivo({ ...json, hijos: [] });
    (json.hijos || []).forEach((h) => nodo.hijos.push(NodoArchivo.fromJSON(h)));
    return nodo;
  }
}

export default NodoArchivo;