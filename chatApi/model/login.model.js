
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    salt: String
})

module.exports = mongoose.model('User',userSchema);