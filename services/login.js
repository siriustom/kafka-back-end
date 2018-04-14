var connection =  require('../kafka/kafkaConnection').kafkaConnection();
var producer = connection.getProducer();

function handle_login(content) {
    return producerSend(content)
}

function producerSend(consumedMsg) {
    var payloads = [
        {
            topic: consumedMsg.replyTo,
            messages: JSON.stringify({
                correlationId: consumedMsg.correlationId,
                data : consumedMsg.data
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