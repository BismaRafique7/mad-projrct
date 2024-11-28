// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAyuA4mEUoAVMBey9zSbG7ig2VVKyA6M08",
  authDomain: "chat-e41cf.firebaseapp.com",
  projectId: "chat-e41cf",
  storageBucket: "chat-e41cf.firebasestorage.app",
  messagingSenderId: "1073692043253",
  appId: "1:1073692043253:web:01567f3a4d8e386d6322bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
