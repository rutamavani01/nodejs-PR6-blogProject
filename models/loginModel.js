const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const loginTbl = mongoose.model('loginCrud',loginSchema);
module.exports = loginTbl;