// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";           // ← Agregar
import { getFirestore } from "firebase/firestore"; // ← Agregar

// ✅ Tu configuración
const firebaseConfig = {
    apiKey: "AIzaSyAdTmQVllYTLexaMeiJyzazl_Hiqy9UV0w",
    authDomain: "webarchivosycarpetas.firebaseapp.com",
    projectId: "webarchivosycarpetas",
    storageBucket: "webarchivosycarpetas.firebasestorage.app",
    messagingSenderId: "717457273883",
    appId: "1:717457273883:web:fac7c362373a65be0d74be"
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORTAR Auth y Firestore (esto te falta)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;