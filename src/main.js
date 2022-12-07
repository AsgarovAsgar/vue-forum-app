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
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.dispatch('fetchAuthUser')
  }
})

const forumApp = createApp(App)
forumApp.component('AppDate', AppDate)
forumApp.use(router);
forumApp.use(store);
forumApp.mount("#app");

