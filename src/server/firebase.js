
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDNCK9iWAM3YMDuZzSegfrMW-nh8ZHSYKs",
  authDomain: "ecomerse-api.firebaseapp.com",
  projectId: "ecomerse-api",
  storageBucket: "ecomerse-api.appspot.com",
  messagingSenderId: "1082698738722",
  appId: "1:1082698738722:web:abb3e625976f70e53cae7b"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export default app;