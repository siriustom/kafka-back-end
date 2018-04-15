var Project = require('../models/project');
var producerService = require('./producerService');

function handle_postproject(content) {
    Project.createProject(content, function (err, project) {
        if (err) throw err;
        if (!project) {
            var noUser = {message: 'no user'};
            return producerService.producerSend(content, noUser);
        }
        var success = {message: 'project posted'};
        return producerService.producerSend(content, success);
    })
}

exports.handle_postproject = handle_postproject;