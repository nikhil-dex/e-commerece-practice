const firebaseStorage = require("multer-firebase-storage");
const multer = require("multer");
const fbadmin = require("./firebase.config")
const serviceCredentials = require("/etc/secrets/project-1-e0088-firebase-adminsdk-fbsvc-f05a113667.json")

const storage = firebaseStorage({
    bucketName: "project-1-e0088.firebasestorage.app",
    credentials: fbadmin.credential.cert(serviceCredentials),
    unique: true,
    public: true
})

const upload = multer({
    storage: storage
})

module.exports = upload;