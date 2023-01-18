const user = require('../models/users')
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
.then(hash =>{

    })
.catch
};

exports.login = (req, res, next) => {

};