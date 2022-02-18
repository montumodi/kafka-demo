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

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
 // Producing
 console.log("Connecting...");
  await consumer.connect()
  console.log("Connected...");
  console.log("Recieving...");
  await consumer.subscribe({ topic: kafkaConfig.topicName, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("New message recieved...");
      console.log({
        partition,
        offset: message.offset,
        value: await schemaRegistry.decode(message.value),
      })
    },
  })
}

run().catch(console.error)