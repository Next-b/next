import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

require("firebase/firestore")
//admin stuff
var admin = require('firebase-admin')

var serviceAccount = require('../functions/service-accounts.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://next-68d1f.firebaseio.com'
  });
//stuff we had before
const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
    apiKey: "AIzaSyDKux4Xq8zFhuLaNySnG4fcsjuA5pZVFSM",
    authDomain: "next-68d1f.firebaseapp.com",
    databaseURL: "https://next-68d1f.firebaseio.com",
    projectId: "next-68d1f",
    storageBucket: "next-68d1f.appspot.com",
    messagingSenderId: "1092618924525"
};


const firestore = firebase.initializeApp(firebaseConfig).firestore()
firestore.settings(settings)
export default firestore

