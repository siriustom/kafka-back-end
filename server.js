var connection =  require('./kafka/kafkaConnection').kafkaConnection();
var serviceMapping = require('./services/serviceMapping');


var consumer = connection.getConsumer();

console.log('kafka back-end server is running');

consumer.on('error', function (err) {
    console.log(err);
});
// consumer.on('offsetOutOfRange', function (topic) {
//     topic.maxNum = 2;
//     var offset = connection.getOffset();
//     offset.fetch([topic], function (err, offsets) {
//         if (err) {
//             return console.error(err);
//         }
//         var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
//         consumer.setOffset(topic.topic, topic.partition, min);
//     });
// });

consumer.on('message', function (message) {
    console.log('message received', message);
    var content = JSON.parse(message.value);
    var topic = message.topic;
    serviceMapping.Mapping(topic)(content);
});

