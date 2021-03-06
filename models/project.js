var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoUrl = require('../constants').MONGOURL;

mongoose.connect(mongoUrl);

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

module.exports.getAllProject = function (today, callback) {
    Project.find(function (err, docs) {
        if (err) throw err;
        if (!docs) {
            return callback(err);
        }
        return callback(null, docs);
    })
}
