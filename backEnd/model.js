const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type:String,
        default: ''
    }
 
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('TestUsers', User);