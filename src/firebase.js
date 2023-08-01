import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBwuUus6zH0nk5C4TE86H1_JhHnzCDEvzY",
    authDomain: "whats-app-slack-clone.firebaseapp.com",
    projectId: "whats-app-slack-clone",
    storageBucket: "whats-app-slack-clone.appspot.com",
    messagingSenderId: "658737725514",
    appId: "1:658737725514:web:b6647d43f049b89b47a6b3"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;