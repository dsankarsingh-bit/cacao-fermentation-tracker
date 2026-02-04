import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Replace these placeholder values with your actual Firebase project config.
// Found at: Firebase Console → your project → Settings → General → Your apps → Web
const firebaseConfig = {
 apiKey: "AIzaSyDDaCmpEYVTri8UD4gqe9Z3VTz4hyBVv9M",
  authDomain: "cacao-fermentation-tracker.firebaseapp.com",
  projectId: "cacao-fermentation-tracker",
  storageBucket: "cacao-fermentation-tracker.firebasestorage.app",
  messagingSenderId: "487109860947",
  appId: "1:487109860947:web:10c2ba95595b1c0a0630a6",
  measurementId: "G-HTYD782J10"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
