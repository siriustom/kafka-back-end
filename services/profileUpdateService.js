var User = require('../models/user');
var producerService = require('./producerService');

function handle_profileupdate(content) {
    var data = content.data;

    User.updateUserById(data.id, data, function (err, user) {
        if (err) throw err;
        var success = {message: 'update complete'};
        return producerService.producerSend(content, success);
    })
}

exports.handle_profileupdate = handle_profileupdate;