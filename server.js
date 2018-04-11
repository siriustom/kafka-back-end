var connection =  require('./kafka/kafkaConnection').kafkaConnection();
var login = require('./services/login');
var express = require('express');
var topic = 'login';
var consumer = connection.getConsumer(topic);
var producer = connection.getProducer();

var port = 3001;

console.log('kafka back-end server is running');


console.log('server is running');
consumer.on('error', function (err) {
    console.log(err);
});
consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2;
    console.log('offset out of range');
    var offset = connection.getOffset();
    offset.fetch([topic], function (err, offsets) {
        if (err) {
            return console.error(err);
        }
        var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});

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

