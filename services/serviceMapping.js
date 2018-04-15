const handle_login = require('./loginService').handle_login;
const handle_postproject = require('./postProjectService').handle_postproject;

const serviceMap = {
    login: handle_login,
    postproject: handle_postproject
}

function Mapping(topic, content) {
    if (serviceMap.hasOwnProperty(topic)) {
        return serviceMap[topic];
    }
}

exports.Mapping = Mapping;