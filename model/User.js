const mongoose = require('mongoose'), Schema=mongoose.Schema;

const UserDetail = new Schema({
    
        // hint: use the shortid npm package to generate it
        name: String, // String, required
        email: String,  // String, required
        age: Number,
        prograd_id: Number,
        squad: Number
      
})

const User = mongoose.model('User',UserDetail);

module.exports = {User};