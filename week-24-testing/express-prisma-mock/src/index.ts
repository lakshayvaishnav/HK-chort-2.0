import express, { response } from "express";
import { z } from "zod";
import { prismaclient } from "./__mocks__/db";

export const app = express();
app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req, res) => {
  const parsedResponse = sumInput.safeParse(req.body);

  if (!parsedResponse.success) {
    return res.status(404).json({ message: "Incorrect inputs" });
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  const response = await prismaclient.sum.create({
    data: {
      a: parsedResponse.data?.a,
      b: parsedResponse.data?.b,
      result: answer,
    },
  });

  res.json({ answer });
});
