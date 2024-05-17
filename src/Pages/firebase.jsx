import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'; 
const firebaseConfig = {
  apiKey: "AIzaSyAiu1YEc8i-ntz96WJjvsDlwoBszv20xY4",

  authDomain: "vinay-364f1.firebaseapp.com",

  projectId: "vinay-364f1",

  storageBucket: "vinay-364f1.appspot.com",

  messagingSenderId: "19635789668",

  appId: "1:19635789668:web:dbf6b1c154a81cff2da471",

  measurementId: "G-RKFKEV5GQC"

};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app)