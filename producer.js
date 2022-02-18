const { Kafka } = require('kafkajs');
const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry');
const { "kafka": kafkaConfig, registry } = require("./config");

const schemaRegistry = new SchemaRegistry({
    host: registry.host,
    auth: {
        username: registry.username,
        password: registry.password
    }
});

const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: kafkaConfig.username,
        password: kafkaConfig.password
    }
});

const producer = kafka.producer();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const run = async () => {
    // Producing
    console.log("Connecting...");
    await producer.connect()
    console.log("Connected...");
    console.log("Sending...");
    const result = await producer.send({
        topic: kafkaConfig.topicName,
        messages: [
            { value: await schemaRegistry.encode(100001, { "my_field1": getRandomInt(50), "my_field2": 1.1, "my_field3": Math.random().toString(36).slice(-5)}) },
        ],
    });
    console.log(result);
    console.log("Sent");
    await producer.disconnect();
    console.log("Disconnected..");
}

run().catch(console.error)