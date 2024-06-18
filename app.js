const express = require("express");
const app = express();


app.get('/',(req,res)=>{
    res.send("hellaaaaao world");
    console.log("called")
})
app.get('/test',(req,res)=>{
    res.send("test page")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is running..!!")
})