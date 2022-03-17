var admin = require("firebase-admin");

var serviceAccount = require("../db_keys/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore();

module.exports = db;