const mongoConn = require('./mongo');

function handle_request(msg, callback) {
    let res = {};
    console.log("In handle request:" + JSON.stringify(msg));
    const username = msg.username;
    const password = msg.password;
    const query = mongoConn.UserConnection.findOne({username: username});
    query.select('password');
    query.exec(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            if (user.password === password) {
                res.value = 'successful login';
            }
        }
    })
    callback(null, res);
}

exports.handle_request = handle_request;