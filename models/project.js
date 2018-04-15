var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoUrl = require('../constants').MONGOURL;

mongoose.connect(mongoUrl);

var ProjectSchema = mongoose.Schema({
    projectId: {
        type: String,
        index: true
    },
    userId: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    period: {
        type: String
    },
    skillsRequired: {
        type: String
    },
    employer: {
        type: String
    },
    budgetRange: {
        type: String
    },
    fileName: {
        type: String
    },
    averageBid: {
        type: String
    },
    bidNumber: {
        type: String
    },
    bidNow: {
        type: String
    }
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.createProject = function(newProject, callback) {
    var p = new Project(newProject);
    p.save(function (err) {
        if (err) throw err;
        return callback();
    })
}
