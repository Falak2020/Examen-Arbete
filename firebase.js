// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkrgZICkJ_luvHnT4UmktuaJOirWnoYgg",
  authDomain: "auth-reactnative-2e7f6.firebaseapp.com",
  projectId: "auth-reactnative-2e7f6",
  storageBucket: "auth-reactnative-2e7f6.appspot.com",
  messagingSenderId: "301483393350",
  appId: "1:301483393350:web:941fd8b60a8748b382a547"
};

// Initialize Firebase
let app;
if(firebase.apps.length===0){
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app()
}
const auth = firebase.auth()

export {auth};