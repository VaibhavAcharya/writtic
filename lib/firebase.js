import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCrY_7FMRxqiW1vRTbPoIBwDh_VRPrus90",
  authDomain: "writtic-f27d4.firebaseapp.com",
  projectId: "writtic-f27d4",
  storageBucket: "writtic-f27d4.appspot.com",
  messagingSenderId: "994167817740",
  appId: "1:994167817740:web:6ad4f2d23a165d6e6cd029",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const FirebaseFirestore = firebase.firestore();

export default firebase;
