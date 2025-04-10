import express from "express";
import { PrismaClient } from "../dist/generated/prisma";

const Client = new PrismaClient();

const app = express();

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store in db a new trigger
  await Client.$transaction(async (tx) => {
    const run = await Client.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    await Client.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.json({ message: "webhook recieved" });
});

app.listen(3000, () => {
  console.log("listening at 3000");
});
