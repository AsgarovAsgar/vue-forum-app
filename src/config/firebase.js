import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyDuik_2W5fjOX0dxEOx6YZbIjMR1T-M3Uc",
  authDomain: "vue-forum-app-d2f3e.firebaseapp.com",
  projectId: "vue-forum-app-d2f3e",
  storageBucket: "vue-forum-app-d2f3e.appspot.com",
  messagingSenderId: "46621206719",
  appId: "1:46621206719:web:a12477697bc95d100d3e0a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
