import { createApp } from 'vue'
import App from './App.vue'
import "./main.css";
import router from '@/router'
import store from "@/store";
import AppDate from '@/components/AppDate'

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

// import firebaseConfig from '@/config/firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDuik_2W5fjOX0dxEOx6YZbIjMR1T-M3Uc",
  authDomain: "vue-forum-app-d2f3e.firebaseapp.com",
  projectId: "vue-forum-app-d2f3e",
  storageBucket: "vue-forum-app-d2f3e.appspot.com",
  messagingSenderId: "46621206719",
  appId: "1:46621206719:web:a12477697bc95d100d3e0a",
};
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const forumApp = createApp(App)
forumApp.component('AppDate', AppDate)
forumApp.use(router);
forumApp.use(store);
forumApp.mount("#app");

