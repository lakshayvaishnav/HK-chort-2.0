import express from "express";
import { z } from "zod";
export const app = express();
app.use(express.json());
const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req, res) => {
  const parsedInput = sumInput.safeParse(req.body);

  if (!parsedInput.success) {
    // this is called early returning.
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const answer = parsedInput.data.a + parsedInput.data.b;

  res.status(200).json({ answer });
});
