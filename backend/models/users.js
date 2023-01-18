const mongoose = require('mongoose');

const users = mongoose.schema ({
    email : {type : String, required: true, unique: true },
    password : {type : String, required: true,}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', users);