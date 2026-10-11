import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { firebaseConfig } from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
