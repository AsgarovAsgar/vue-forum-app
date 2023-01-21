import { createApp } from 'vue'
import App from './App.vue'
import "./main.css";
import router from '@/router'
import store from "@/store";
import AppDate from '@/components/AppDate'
import AppSpinner from '@/components/AppSpinner'
import AppAvatarImg from '@/components/AppAvatarImg'

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import ClickOutsideDirective from './plugins/ClickOutsideDirective';
import PageScrollDirective from './plugins/PageScrollDirective';
import Vue3Pagination from './plugins/Vue3Pagination';

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
// firebase.auth().onAuthStateChanged(user => {
//   store.dispatch('unsubscribeAuthUserSnapshot')
//   if(user) {
//     store.dispatch('fetchAuthUser')
//   }
// })

const forumApp = createApp(App)
forumApp.component('AppDate', AppDate)
forumApp.component('AppSpinner', AppSpinner)
forumApp.component('AppAvatarImg', AppAvatarImg)
forumApp.use(router);
forumApp.use(store);
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.use(Vue3Pagination)
forumApp.mount("#app");


