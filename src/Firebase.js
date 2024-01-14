import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyAQG9ED0_pK7Wm7xDnLPAuVelNJU-R7JpE",
    authDomain: "bailoutbuddy-196c2.firebaseapp.com",
    databaseURL: "https://bailoutbuddy-196c2-default-rtdb.firebaseio.com",
    projectId: "bailoutbuddy-196c2",
    storageBucket: "bailoutbuddy-196c2.appspot.com",
    messagingSenderId: "764140571700",
    appId: "1:764140571700:web:cc963fc6833cbcb15fce61",
    measurementId: "G-MBL9R0WCL3"
  };

const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);