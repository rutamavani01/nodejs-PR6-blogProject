const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    title : {
        type:String,
        require : true
    },
    desc : {
        type: String,
        require : true
    },
    image : {
        type: String,
        require : true
    }

})

const formModel = mongoose.model('formCrud',formSchema);
module.exports = formModel;