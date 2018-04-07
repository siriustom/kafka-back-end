const mongoose = require('mongoose');


const mongoSessionURL = 'mongodb://localhost:27017/sessions';
const mongoUserURL = 'mongodb://localhost:27017/users';
module.exports.SessionConnection = function() {
    const conn = mongoose.createConnection(mongoSessionURL);
    return conn;
}

module.exports.UserConnection = function () {
    const conn = mongoose.createConnection(mongoUserURL);
    return conn;
}


