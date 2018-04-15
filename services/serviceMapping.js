const handle_login = require('./loginService').handle_login;
const handle_postproject = require('./postProjectService').handle_postproject;
const handle_register = require('./registerService').handle_register;

const serviceMap = {
    login: handle_login,
    postproject: handle_postproject,
    register: handle_register
}

function Mapping(topic) {
    if (serviceMap.hasOwnProperty(topic)) {
        return serviceMap[topic];
    }
}

exports.Mapping = Mapping;