
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCZwg-mdmDnP8thspoY6ENNTMxXOcxeNz0",
  authDomain: "ecommerce-e514f.firebaseapp.com",
  projectId: "ecommerce-e514f",
  storageBucket: "ecommerce-e514f.appspot.com",
  messagingSenderId: "813336983443",
  appId: "1:813336983443:web:604689307d3a7d3ad7da66"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;