import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFileSystem } from "../hooks/useFileSystem";

const FileSystemContext = createContext(null);

export function FileSystemProvider({ children }) {
  const { user } = useAuth();
  const valor = useFileSystem(user);
  return <FileSystemContext.Provider value={valor}>{children}</FileSystemContext.Provider>;
}

export function useArchivos() {
  const ctx = useContext(FileSystemContext);
  if (!ctx) throw new Error("useArchivos debe usarse dentro de <FileSystemProvider>");
  return ctx;
}