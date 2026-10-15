import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { FileSystemProvider } from "./context/FileSystemContext";
import { useAuth } from "./hooks/useAuth";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FileManager from "./Pages/FileManager";

function Rutas() {
  const { user, cargando } = useAuth();
  const [modo, setModo] = useState("login");

  if (cargando) return <p className="vacio">Cargando...</p>;

  
  if (!user) {
    return modo === "login" ? (
      <Login onCambiar={() => setModo("register")} />
    ) : (
      <Register onCambiar={() => setModo("login")} />
    );
  }

  return (
    <FileSystemProvider>
      <FileManager />
    </FileSystemProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Rutas />
    </AuthProvider>
  );
}