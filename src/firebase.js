import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

initializeApp({
    apiKey: "AIzaSyAsHZmRujTLyQUalsdTm-AxAY_PWazvrLI",
    authDomain: "solvesome.firebaseapp.com",
    projectId: "solvesome",
    storageBucket: "solvesome.appspot.com",
    messagingSenderId: "1042004317268",
    appId: "1:1042004317268:web:492fd722d82a14551c49c1"
});

const db = getFirestore();
const auth = getAuth();

export { db, auth };