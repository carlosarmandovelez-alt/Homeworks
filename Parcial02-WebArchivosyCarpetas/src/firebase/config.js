
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";           
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyAdTmQVllYTLexaMeiJyzazl_Hiqy9UV0w",
    authDomain: "webarchivosycarpetas.firebaseapp.com",
    projectId: "webarchivosycarpetas",
    storageBucket: "webarchivosycarpetas.firebasestorage.app",
    messagingSenderId: "717457273883",
    appId: "1:717457273883:web:fac7c362373a65be0d74be"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
