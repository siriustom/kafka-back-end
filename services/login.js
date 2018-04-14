var connection =  require('../kafka/kafkaConnection').kafkaConnection();
var producer = connection.getProducer();
var User = require('../models/user');

function handle_login(content) {
    var username = content.data.username;
    var password = content.data.password;
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            var noUser = {message: 'no user'};
            return producerSend(content, noUser);
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                console.log('ismatch');
                return producerSend(content, user);
            } else {
                console.log('isnotmatch');
                var inValidP = {message: 'invalid password'};
                return producerSend(content, inValidP);
            }
        })
    });
}

function producerSend(consumedMsg, returnedMsg) {
    var payloads = [
        {
            topic: consumedMsg.replyTo,
            messages: JSON.stringify({
                correlationId: consumedMsg.correlationId,
                data : returnedMsg
            }),
            partition : 0
        }
    ];
    producer.send(payloads, function(err, data){
        if (err) {
            throw err;
        }
        console.log(data);
    });
}

exports.handle_login = handle_login;