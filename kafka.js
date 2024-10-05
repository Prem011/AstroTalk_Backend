// kafka.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Adjust based on your broker's address
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'request-processor-group' });

const startKafka = async () => {
  await producer.connect();
  await consumer.connect();

  // Subscribe to the request topic
  await consumer.subscribe({ topic: 'request-queue', fromBeginning: true });

  // Process incoming messages
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      // Process the message (e.g., handle the request)
    },
  });
};

module.exports = { producer, startKafka };
