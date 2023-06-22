const express = require('express');

const port = 8009;

const app = express();

const path = require('path');

const fs = require('fs');

const db = require('./confige/mongoose');

const Admin = require('./model/Admin');

app.use(express.urlencoded());

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.set('view engine','ejs');
app.set("views",path.join(__dirname,'views'));

app.use('/',require("./routes/index"));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is running properly");
})
