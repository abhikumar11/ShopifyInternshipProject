const mongoose=require("mongoose");
require("dotenv").config();
const connectDb=()=>{
    mongoose.connect(`${process.env.DBCONN}`)
            .then(()=>{console.log("Database connected successfully")})
            .catch(()=>{console.log("Unable to connect to the database")})
}
module.exports=connectDb;