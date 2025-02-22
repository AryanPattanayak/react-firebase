
//! connecting react with firebase


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";     //! important


const firebaseConfig = {
    apiKey: "AIzaSyC6jwiDUHU3KIs53DyHOQ2qrSL0fI5whHA",
    authDomain: "expressdemo-27c12.firebaseapp.com",
    projectId: "expressdemo-27c12",
    storageBucket: "expressdemo-27c12.firebasestorage.app",
    messagingSenderId: "1095023211131",
    appId: "1:1095023211131:web:39bfcb3aa067ee3072e8de",
    measurementId: "G-P3WMEJR6GH"
  };


  const app = initializeApp(firebaseConfig);
const db= getFirestore(app)   //! important

export default db