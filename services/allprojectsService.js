var Project = require('../models/project');
var producerService = require('./producerService');

function handle_allprojects(content) {
    Project.getAllProject(content.today, function (err, project) {
        if (err) throw err;
        var success = {message: 'all projects returned'};
        return producerService.producerSend(content, success);
    })
}

exports.handle_allprojects = handle_allprojects;