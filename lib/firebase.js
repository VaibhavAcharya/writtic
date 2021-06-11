import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyADEH9B9mQCkcPiNvZirvzzT4hqGEfEA0Q",
  authDomain: "comtute-e1642.firebaseapp.com",
  projectId: "comtute-e1642",
  storageBucket: "comtute-e1642.appspot.com",
  messagingSenderId: "399838917251",
  appId: "1:399838917251:web:367defe19cf9f4b818a1b6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const FirebaseFirestore = firebase.firestore();

export default firebase;
