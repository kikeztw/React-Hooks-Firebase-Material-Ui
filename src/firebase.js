import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_apiKey : process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_authDomain : process.env.REACT_APP_firebase_authDomain,
  databaseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_databaseURL : process.env.REACT_APP_firebase_databaseURL,
  projectId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_projectId : process.env.REACT_APP_firebase_projectId,
  storageBucket: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_storageBucket : process.env.REACT_APP_firebase_storageBucket,
  messagingSenderId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_messagingSenderId : process.env.REACT_APP_firebase_messagingSenderId,
  appId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_firebase_production_appId : process.env.REACT_APP_firebase_appId,
};

firebase.initializeApp(firebaseConfig);


export default firebase;
