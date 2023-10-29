// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMhIdHm416y6opiagxeD9RyYt6s6cAuDc",
  authDomain: "brendabar-9af47.firebaseapp.com",
  projectId: "brendabar-9af47",
  storageBucket: "brendabar-9af47.appspot.com",
  messagingSenderId: "731797143328",
  appId: "1:731797143328:web:bb2f2a7b828685f48de145"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
