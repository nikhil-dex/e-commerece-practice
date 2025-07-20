const fbadmin = require("firebase-admin");
const serviceCredentials = require("../etc/secret/project-1-e0088-firebase-adminsdk-fbsvc-f05a113667.json")

fbadmin.initializeApp({
    credential: fbadmin.credential.cert(serviceCredentials),
    storageBucket: "project-1-e0088.firebasestorage.app"
});

module.exports = fbadmin;