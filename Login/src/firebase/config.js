// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDE35Bd9Pd_knVSxLfxc7xkyWuRRRcM_e0",
    authDomain: "login-b090d.firebaseapp.com",
    projectId: "login-b090d",
    storageBucket: "login-b090d.firebasestorage.app",
    messagingSenderId: "1064178149215",
    appId: "1:1064178149215:web:2b8de374b8eb5d5825b8ea"
    // ⚠️ Quitamos measurementId porque no usamos Analytics
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ✅ Exportar Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;