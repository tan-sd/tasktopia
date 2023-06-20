// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebaseApp = initializeApp({...firebaseConfig});
// const analytics = getAnalytics(app);
const auth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp);

const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const signOutUser = () => {
    return signOut(auth);
}

export { auth, createUser, signInUser, signOutUser, database };