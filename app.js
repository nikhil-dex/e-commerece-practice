require("dotenv").config()
const express = require("express");
const app = express();
const db = require("./config/mongodb")
const cors = require("cors")
db()

//gs://project-1-e0088.firebasestorage.app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/",require("./routes/index.routes"))
app.use("/user",require("./routes/user.routes"))
app.use("/product",require("./routes/products.routes"))

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})



