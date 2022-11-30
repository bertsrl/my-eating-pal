import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADdogQhd33Kv0kzgTSrVJh-eaJdYJU0cc",
  authDomain: "my-eating-pal.firebaseapp.com",
  projectId: "my-eating-pal",
  storageBucket: "my-eating-pal.appspot.com",
  messagingSenderId: "603897952032",
  appId: "1:603897952032:web:a13932b0ad6bf9542ac945"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//use these db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };