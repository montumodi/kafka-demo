module.exports = {
    "kafka": {
        "username": process.env.BROKER_USERNAME,
        "password": process.env.BROKER_PASSWORD,
        "brokers": ['pkc-e8mp5.eu-west-1.aws.confluent.cloud:9092'],
        "clientId": "my-first-kafka",
        "topicName": "daily-routine"
    },
    "registry": {
        "username": process.env.REGISTRY_USERNAME,
        "password": process.env.REGISTRY_PASSWORD,
        "host": "https://psrc-4v1qj.eu-central-1.aws.confluent.cloud"
    }
};