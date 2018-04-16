const handle_login = require('./loginService').handle_login;
const handle_postproject = require('./postProjectService').handle_postproject;
const handle_register = require('./registerService').handle_register;
const handle_profileupdate = require('./profileUpdateService').handle_profileupdate;

const serviceMap = {
    login: handle_login,
    postproject: handle_postproject,
    register: handle_register,
    profileedit: handle_profileupdate
}

function Mapping(topic) {
    if (serviceMap.hasOwnProperty(topic)) {
        return serviceMap[topic];
    }
}

exports.Mapping = Mapping;