var Project = require('../models/project');
var producerService = require('./producerService');

function handle_postproject(content) {
    Project.createProject(content.data, function (err, project) {
        if (err) throw err;
        var success = {message: 'project posted'};
        return producerService.producerSend(content, success);
    })
}

exports.handle_postproject = handle_postproject;