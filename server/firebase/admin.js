//initialize SDK
var admin = require('firebase-admin');

var serviceAccount = require('../../functions');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://Next.firebaseio.com'
});
