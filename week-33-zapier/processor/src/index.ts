import { PrismaClient } from "./generated/prisma";
import { Kafka } from "kafkajs";

const client = new PrismaClient();

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "zapier",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((row) => ({
        value: row.zapRunId,
      })),
    });

    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((x) => x.id),
        },
      },
    });
  }
}

main();
 