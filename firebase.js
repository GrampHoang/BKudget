// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZTU7tp5IYrY3bqHWbxfNsN0lOnjEmcdM",
  authDomain: "bkudget-e3795.firebaseapp.com",
  projectId: "bkudget-e3795",
  storageBucket: "bkudget-e3795.appspot.com",
  messagingSenderId: "588028337287",
  appId: "1:588028337287:web:17a438cc87445ed7752c22",
  measurementId: "G-WH3HHX158G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const handleSignUp = (login, pass) => {
    
    createUserWithEmailAndPassword(auth, login, pass)
    .catch((error) => {
    alert(error.message);
    // ..
    });
}

export {handleSignUp};