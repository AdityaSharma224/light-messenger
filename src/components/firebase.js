import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBk6Bxwy8nzGkzfmkyflxfPhBsdmbzV43E",
    authDomain: "mylightmessenger.firebaseapp.com",
    projectId: "mylightmessenger",
    storageBucket: "mylightmessenger.appspot.com",
    messagingSenderId: "260034771184",
    appId: "1:260034771184:web:cb905b960768a915186a35"
  }).auth();