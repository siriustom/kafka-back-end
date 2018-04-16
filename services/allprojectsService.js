var Project = require('../models/project');
var producerService = require('./producerService');

function handle_allprojects(content) {
    Project.getAllProject(content.today, function (err, project) {
        if (err) throw err;
        return producerService.producerSend(content, project);
    })
}

exports.handle_allprojects = handle_allprojects;