import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "lolno",
    authDomain: "poker-planningn.firebaseapp.com",
    projectId: "poker-planningn",
    storageBucket: "poker-planningn.appspot.com",
    messagingSenderId: "864147550775",
    appId: "1:864147550775:web:248d1f49203d6770c585b2"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };