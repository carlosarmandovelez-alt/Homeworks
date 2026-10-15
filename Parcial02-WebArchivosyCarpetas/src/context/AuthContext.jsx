import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext(null);

const MENSAJES = {
  "auth/invalid-credential": "Correo o contraseña incorrectos",
  "auth/user-not-found": "El usuario no está registrado",
  "auth/wrong-password": "Contraseña incorrecta",
  "auth/email-already-in-use": "Ese correo ya está registrado",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
  "auth/invalid-email": "Correo inválido",
  "auth/too-many-requests": "Demasiados intentos, intenta más tarde",
};

const traducir = (error) =>
  new Error(MENSAJES[error.code] || "Ocurrió un error de autenticación");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setNombreCompleto(u?.displayName || "");
      setCargando(false);
    });
    return cancelar;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw traducir(e);
    }
  };

  const register = async ({ nombre, apellido, email, password }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = `${nombre.trim()} ${apellido.trim()}`;
      await updateProfile(cred.user, { displayName });
      // updateProfile no dispara onAuthStateChanged, actualizamos a mano
      setNombreCompleto(displayName);
    } catch (e) {
      throw traducir(e);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, nombreCompleto, cargando, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}