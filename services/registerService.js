var User = require('../models/user');
var producerService = require('./producerService');

function handle_register(content) {
    var data = content.data;
    var newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        about: data.about,
        skill: data.skill,
        filename: data.fileName
    });
    User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
            return producerService.producerSend(content, user);
    })
}

exports.handle_register = handle_register;