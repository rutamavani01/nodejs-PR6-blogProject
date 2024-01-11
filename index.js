const express = require('express');
const port = 8000;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded());
const path = require('path');

const db = require('./config/db');
const cookie = require('cookie-parser');

// cookie parse
app.use(cookie());        

app.use('/',require('./routes/userRoutes'));

app.use(express.static(path.join(__dirname, '/public')))   
app.use('/uploads',express.static(path.join(__dirname,'uploads')));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`server is start on port : ${port}`);
});