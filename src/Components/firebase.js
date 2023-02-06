// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR6Khw8y4LjyqHwr_EKTmXzGSvIFaBZ6s",
  authDomain: "uploadimg-a55cf.firebaseapp.com",
  projectId: "uploadimg-a55cf",
  storageBucket: "uploadimg-a55cf.appspot.com",
  messagingSenderId: "176464269955",
  appId: "1:176464269955:web:ed7995881606406039c1b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);