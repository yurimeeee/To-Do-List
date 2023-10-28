import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-OMVpv3N2dwNc6cUDG_mDKyrVwcXkyO8",
  authDomain: "to-do-list-c9f5a.firebaseapp.com",
  projectId: "to-do-list-c9f5a",
  storageBucket: "to-do-list-c9f5a.appspot.com",
  messagingSenderId: "886144146161",
  appId: "1:886144146161:web:ac31654afa587c859ce750",
  // apiKey: process.env.APIKEY,
  // authDomain: process.env.AUTHDOMAIN,
  // projectId: process.env.PROJECTID,
  // storageBucket: process.env.STORAGEBUCKET,
  // messagingSenderId: process.env.MESSAGINGSENDERID,
  // appId: process.env.APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);

export const db = getFirestore(app); //Cloud Firestore 초기화
