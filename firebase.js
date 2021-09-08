import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCaHm9RWF4Aw8YHRQ04OIg3JqjGc-GPMO0",
    authDomain: "whatsapp-clone-bf8f7.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-bf8f7-default-rtdb.firebaseio.com",
    projectId: "whatsapp-clone-bf8f7",
    storageBucket: "whatsapp-clone-bf8f7.appspot.com",
    messagingSenderId: "436419976225",
    appId: "1:436419976225:web:7f5f58ea292253a7da9760",
    measurementId: "G-TSR4M0L329"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;