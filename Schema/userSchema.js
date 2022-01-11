let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userId : Number,
    userName : String,
    password : String,
})

module.exports = mongoose.model ('user',userSchema,'Users');