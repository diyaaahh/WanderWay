const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Userschema = new Schema ({
    name: String,
    email: {type: String, unique:true},
    password: String
})

const UserModel = mongoose.model('User' , Userschema);

module.exports = UserModel;