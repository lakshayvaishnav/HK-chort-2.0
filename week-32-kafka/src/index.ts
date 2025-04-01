import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // producing
  await producer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [
      {
        value: "hello from kafkajs producer",
      },
    ],
  });

  // consuming

  await consumer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        return;
      }
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
};

run().catch(console.error);
