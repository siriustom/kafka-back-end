var User = require('../models/user');
var producerService = require('./producerService');

function handle_register(content) {
    User.createUser(content, function(err, user) {
            if (err) throw err;
            console.log(user);
            return producerService.producerSend(content, user);
    })
}

exports.handle_register = handle_register;