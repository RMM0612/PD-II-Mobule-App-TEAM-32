// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxYF5Ma5st8hXEjBnY7UTTQpsISW7icRY",
  authDomain: "raspberrypi-4627a.firebaseapp.com",
  projectId: "raspberrypi-4627a",
  storageBucket: "raspberrypi-4627a.firebasestorage.app",
  messagingSenderId: "1035014394732",
  appId: "1:1035014394732:web:6e7e389f42c1a465559949",
  measurementId: "G-JF8F096N1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

export { app, auth };  // Export app and auth for use in other files
