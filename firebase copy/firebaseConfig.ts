import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCqINOCOEvPs-vKVTYFtd2WWo1TNcgNBlg",
  authDomain: "attendance-system-d1f40.firebaseapp.com",
  projectId: "attendance-system-d1f40",
  storageBucket: "attendance-system-d1f40.appspot.com",
  messagingSenderId: "72631560139",
  appId: "1:72631560139:web:d739470e7b6423e1dd784e"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);