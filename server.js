var connection =  new require('./kafka/kafkaConnection');
var login = require('./services/login');

var topic = 'login';
var consumer = connection.getConsumer(topic);
var producer = connection.getProducer();

console.log('kafka back-end server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err, res) {
        console.log('after handle' + res);
        var payloads = [
            {
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});