var connection =  require('../kafka/kafkaConnection').kafkaConnection();
var producer = connection.getProducer();

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

exports.producerSend = producerSend;