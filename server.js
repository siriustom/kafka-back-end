var connection =  require('./kafka/kafkaConnection').kafkaConnection();
var login = require('./services/login');

var topic = 'login';
var consumer = connection.getConsumer(topic);

var port = 3001;

console.log('kafka back-end server is running');


console.log('server is running');
consumer.on('error', function (err) {
    console.log(err);
});
consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2;
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
    var content = JSON.parse(message.value);
    login.handle_login(content);
});

