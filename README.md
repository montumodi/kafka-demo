# Kafka Demo

### Make sure following env variables are set

```
export REGISTRY_USERNAME=
export REGISTRY_PASSWORD=
export BROKER_USERNAME=
export BROKER_PASSWORD=
```

Also make sure that `config.js` has the relevant registry url, broker url, client id and topic names are set. These can be generated from confluent console.

## How to run?

`npm install`
`node producer.js` // To publish random messages to topic

`node consumer.js` // To consume messages from topic