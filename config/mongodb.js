const mongoose = require("mongoose")

const db = () => {
    try{
       return mongoose.connect(process.env.MONGO_URI)
       .then(()=>{
        console.log("connected to db")
       })
    }catch(err){
        console.log(err.message)
    }
}
module.exports = db;
