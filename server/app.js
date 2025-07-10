import express from "express";
const app = express()

app.get('/',(req,res)=>{
   res.send("Hello i am BAsit");
})

export { app as server};