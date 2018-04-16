var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoUrl = require('../constants').MONGOURL;
var option = require('./poolConfig').option;
mongoose.connect(mongoUrl, option);

var ProjectSchema = mongoose.Schema({
    userId: {
        type: String,
        index: true
    },
    title: {
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
    newProject.save(callback);
}
