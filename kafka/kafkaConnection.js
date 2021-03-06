var kafka = require('kafka-node');

module.exports.kafkaConnection = function() {
    var getConsumer = function() {
        if (!this.kafkaConsumer) {
            this.client = new kafka.Client("localhost:2181");//a client connection to zookeeper and brokers
            this.kafkaConsumer = new kafka.Consumer(this.client,
                [
                    { topic: 'login', partition: 0 },
                    { topic: 'postproject', partition: 0 },
                    { topic: 'register', partition: 0 },
                    { topic: 'profileedit', partition: 0 },
                    { topic: 'allprojects', partition: 0 },
                    { topic: 'getbidlist', partition: 0 },
                    { topic: 'bid', partition: 0 },
                    { topic: 'hire', partition: 0 },
                    { topic: 'makepayment', partition: 0 },
                    { topic: 'yourallprojects', partition: 0 },
                    { topic: 'searchbarbyname', partition: 0 },
                ]);
            this.client.on('ready', function () {
                console.log('consumer ready!')
            })
        }
        return this.kafkaConsumer;
    };

    var getProducer = function() {
        if (!this.kafkaProducer) {
            this.client = new kafka.Client("localhost:2181");//a client connection to zookeeper and brokers
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducer = new HighLevelProducer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducer;
    };

    var getOffset = function () {
        if (! this.kafkaOffset) {
            this.client = new kafka.Client("localhost:2181");//a client connection to zookeeper and brokers
            this.kafkaOffset = new kafka.Offset(this.client);
        }
        return this.kafkaOffset;
    };

    return {
        getConsumer: getConsumer,
        getProducer: getProducer,
        getOffset: getOffset
    }
};
