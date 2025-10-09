import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxWUZne64BITzj46JVCX7kgPwWLqIDi7U",
    authDomain: "tiendalevelupgamer-70a7e.firebaseapp.com",
    projectId: "tiendalevelupgamer-70a7e",
    storageBucket: "tiendalevelupgamer-70a7e.firebasestorage.app",
    messagingSenderId: "671411985633",
    appId: "1:671411985633:web:ada175c909fca6daf46ba0",
    measurementId: "G-8S1ZQCSY5D"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  export { auth, db };