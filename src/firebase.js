import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCUv6Fo7NzpZozfciFFEDVUmsYnUAgC2sc",
    authDomain: "messenger-53f33.firebaseapp.com",
    projectId: "messenger-53f33",
    storageBucket: "messenger-53f33.appspot.com",
    messagingSenderId: "666465542024",
    appId: "1:666465542024:web:db4ed7ce48b9a24903643d",
    measurementId: "G-HCJYEJWY81"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

  