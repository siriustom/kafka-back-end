var User = require('../models/user');
var producerService = require('./producerService');

function handle_login(content) {
    var username = content.data.username;
    var password = content.data.password;
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            var noUser = {message: 'no user'};
            return producerService.producerSend(content, noUser);
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                console.log('ismatch');
                return producerService.producerSend(content, user);
            } else {
                console.log('isnotmatch');
                var inValidP = {message: 'invalid password'};
                return producerService.producerSend(content, inValidP);
            }
        })
    });
}

exports.handle_login = handle_login;