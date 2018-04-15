var Project = require('../models/project');
var producerService = require('./producerService');

function handle_postproject(content) {
    var data = content.data;
    var newProject = new Project({
        userId: data.userId,
        title: data.title,
        description: data.description,
        period: data.period,
        skillsRequired: data.skillsRequired,
        employer: data.name,
        budgetRange: data.budgetRange,
        fileName: data.fileName,
        averageBid: data.averageBid,
        bidNumber: data.bidNumber,
        bidNow: data.bidNow
    });
    Project.createProject(newProject, function (err, project) {
        if (err) throw err;
        var success = {message: 'project posted'};
        return producerService.producerSend(content, success);
    })
}

exports.handle_postproject = handle_postproject;