import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1mU4cGi0kxGmAjzvA-zrkGVbXqfMQBtQ",
  authDomain: "krashak-setu-testing.firebaseapp.com",
  projectId: "krashak-setu-testing",
  storageBucket: "krashak-setu-testing.appspot.com",
  messagingSenderId: "730432132265",
  appId: "1:730432132265:web:eb84541bbc422dfa1705b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};