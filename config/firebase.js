import firebase from 'firebase/app';

import 'firebase/functions';

import 'firebase/auth'

import 'firebase/firestore';
import 'firebase/firestore/bundle';

const firebaseConfig = {
    apiKey: "AIzaSyBWNPmA1dvJDL6hEOY5HlqiLQckayAX34I",
    authDomain: "halal-dining-uk.firebaseapp.com",
    projectId: "halal-dining-uk",
    storageBucket: "halal-dining-uk.appspot.com",
    messagingSenderId: "589257054020",
    appId: "1:589257054020:web:b834d65dcdc5d6109a2911",
    measurementId: "G-ZWQWX7FNDP"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;


// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)

// export {app, db};