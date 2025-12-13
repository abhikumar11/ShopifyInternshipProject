const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const connectDb = require("./config/DbConnection");
require("dotenv").config();

const app=express();
connectDb();
app.listen(3001,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})